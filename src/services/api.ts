
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
  const { data, error } = await supabase
    .from("rooms")
    .insert(roomData)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment rooms_hosted count for the user
  await supabase
    .from("profiles")
    .update({ rooms_hosted: supabase.rpc("increment", { inc: 1 }) })
    .eq("id", roomData.host_id);
  
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
      ...loopData,
      file_url: publicUrl
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment loops_recorded count for the user
  await supabase
    .from("profiles")
    .update({ loops_recorded: supabase.rpc("increment", { inc: 1 }) })
    .eq("id", loopData.user_id);
  
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
      ...mixdownData,
      file_url: publicUrl
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  // Increment mixdowns_exported count for the user
  await supabase
    .from("profiles")
    .update({ mixdowns_exported: supabase.rpc("increment", { inc: 1 }) })
    .eq("id", mixdownData.user_id);
  
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
  const { data, error } = await supabase
    .from("chat_messages")
    .insert(message)
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
