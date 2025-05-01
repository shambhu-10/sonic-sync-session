
import { supabase } from "@/integrations/supabase/client";
import { Room, Loop, Participant, Mixdown, User, ChatMessage } from "@/types";

// Room Services
export const getRooms = async (isPublic: boolean = true, limit: number = 10) => {
  const query = supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (isPublic) {
    query.eq("is_public", true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data as Room[];
};

export const getMyRooms = async (userId: string, limit: number = 10) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("host_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) {
    throw error;
  }
  
  return data as Room[];
};

export const getRoom = async (roomId: string) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as Room;
};

export const createRoom = async (roomData: Partial<Room>) => {
  // Ensure required fields are present
  if (!roomData.host_id || !roomData.title) {
    throw new Error("Missing required fields for room creation");
  }

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      title: roomData.title,
      description: roomData.description,
      bpm: roomData.bpm,
      key_signature: roomData.key_signature,
      host_id: roomData.host_id,
      is_public: roomData.is_public
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment rooms_hosted count for the user
  try {
    // Get current count
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("rooms_hosted")
      .eq("id", roomData.host_id)
      .single();
    
    if (!profileError && profileData) {
      const currentCount = profileData.rooms_hosted || 0;
      // Update with incremented value
      await supabase
        .from("profiles")
        .update({ rooms_hosted: currentCount + 1 })
        .eq("id", roomData.host_id);
    }
  } catch (err) {
    console.error("Failed to update rooms_hosted count", err);
  }
  
  return data as Room;
};

// Loop Services
export const getLoops = async (roomId: string) => {
  const { data, error } = await supabase
    .from("loops")
    .select(`
      *,
      profiles:user_id (username)
    `)
    .eq("room_id", roomId)
    .order("order_index", { ascending: true });
  
  if (error) {
    throw error;
  }
  
  return data.map(loop => ({
    ...loop,
    username: loop.profiles?.username
  })) as Loop[];
};

export const createLoop = async (loopData: Partial<Loop>, audioFile: Blob) => {
  // Ensure required fields are present
  if (!loopData.room_id || !loopData.user_id || !loopData.name) {
    throw new Error("Missing required fields for loop creation");
  }
  
  // Upload audio file to storage
  const fileExt = "webm";
  const filePath = `${loopData.user_id}/${loopData.room_id}/${new Date().getTime()}.${fileExt}`;
  
  const { error: uploadError, data: uploadData } = await supabase.storage
    .from("audio")
    .upload(filePath, audioFile);
  
  if (uploadError) {
    throw uploadError;
  }
  
  // Get public URL for the file
  const { data: { publicUrl } } = supabase.storage
    .from("audio")
    .getPublicUrl(filePath);
  
  // Create loop record in database
  const { data, error } = await supabase
    .from("loops")
    .insert({
      room_id: loopData.room_id,
      user_id: loopData.user_id,
      name: loopData.name,
      file_url: publicUrl,
      order_index: loopData.order_index || 0,
      is_active: loopData.is_active !== undefined ? loopData.is_active : true,
      volume: loopData.volume || 75
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment loops_recorded count for the user
  try {
    // Get current count
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("loops_recorded")
      .eq("id", loopData.user_id)
      .single();
    
    if (!profileError && profileData) {
      const currentCount = profileData.loops_recorded || 0;
      // Update with incremented value
      await supabase
        .from("profiles")
        .update({ loops_recorded: currentCount + 1 })
        .eq("id", loopData.user_id);
    }
  } catch (err) {
    console.error("Failed to update loops_recorded count", err);
  }
  
  return data as Loop;
};

export const updateLoop = async (loopId: string, updates: Partial<Loop>) => {
  const { data, error } = await supabase
    .from("loops")
    .update(updates)
    .eq("id", loopId)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as Loop;
};

export const deleteLoop = async (loopId: string) => {
  const { error } = await supabase
    .from("loops")
    .delete()
    .eq("id", loopId);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// Participant Services
export const getRoomParticipants = async (roomId: string) => {
  const { data, error } = await supabase
    .from("room_participants")
    .select(`
      *,
      profiles:user_id (username, avatar_url)
    `)
    .eq("room_id", roomId);
  
  if (error) {
    throw error;
  }
  
  return data.map(participant => ({
    ...participant,
    username: participant.profiles?.username,
    avatar_url: participant.profiles?.avatar_url
  })) as Participant[];
};

export const joinRoom = async (roomId: string, userId: string) => {
  const { data, error } = await supabase
    .from("room_participants")
    .insert({ room_id: roomId, user_id: userId })
    .select()
    .single();
  
  if (error && error.code !== "23505") { // Ignore duplicate key errors
    throw error;
  }
  
  return data as Participant;
};

export const leaveRoom = async (roomId: string, userId: string) => {
  const { error } = await supabase
    .from("room_participants")
    .delete()
    .match({ room_id: roomId, user_id: userId });
  
  if (error) {
    throw error;
  }
  
  return true;
};

// Mixdown Services
export const createMixdown = async (mixdownData: Partial<Mixdown>, audioFile: Blob) => {
  // Ensure required fields are present
  if (!mixdownData.room_id || !mixdownData.user_id) {
    throw new Error("Missing required fields for mixdown creation");
  }
  
  // Upload audio file to storage
  const fileExt = "webm";
  const filePath = `mixdowns/${mixdownData.user_id}/${mixdownData.room_id}/${new Date().getTime()}.${fileExt}`;
  
  const { error: uploadError, data: uploadData } = await supabase.storage
    .from("audio")
    .upload(filePath, audioFile);
  
  if (uploadError) {
    throw uploadError;
  }
  
  // Get public URL for the file
  const { data: { publicUrl } } = supabase.storage
    .from("audio")
    .getPublicUrl(filePath);
  
  // Create mixdown record in database
  const { data, error } = await supabase
    .from("mixdowns")
    .insert({
      room_id: mixdownData.room_id,
      user_id: mixdownData.user_id,
      file_url: publicUrl
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment mixdowns_exported count for the user
  try {
    // Get current count
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("mixdowns_exported")
      .eq("id", mixdownData.user_id)
      .single();
    
    if (!profileError && profileData) {
      const currentCount = profileData.mixdowns_exported || 0;
      // Update with incremented value
      await supabase
        .from("profiles")
        .update({ mixdowns_exported: currentCount + 1 })
        .eq("id", mixdownData.user_id);
    }
  } catch (err) {
    console.error("Failed to update mixdowns_exported count", err);
  }
  
  return data as Mixdown;
};

export const getMixdowns = async (roomId: string) => {
  const { data, error } = await supabase
    .from("mixdowns")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return data as Mixdown[];
};

// User Services
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as User;
};

export const updateProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as User;
};

// Chat Services
export const sendMessage = async (message: Partial<ChatMessage>) => {
  // Ensure required fields are present
  if (!message.room_id || !message.user_id || !message.content) {
    throw new Error("Missing required fields for sending message");
  }
  
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      room_id: message.room_id,
      user_id: message.user_id,
      content: message.content
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as ChatMessage;
};

export const getMessages = async (roomId: string, limit: number = 50) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select(`
      *,
      profiles:user_id (username)
    `)
    .eq("room_id", roomId)
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) {
    throw error;
  }
  
  return data.map(message => ({
    ...message,
    username: message.profiles?.username
  })) as ChatMessage[];
};
