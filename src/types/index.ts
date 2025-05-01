
// User & Auth Types
export interface User {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  rooms_hosted: number;
  loops_recorded: number;
  mixdowns_exported: number;
}

export interface Session {
  user: User | null;
  access_token: string | null;
}

// Room & Collaboration Types
export interface Room {
  id: string;
  title: string;
  description?: string;
  bpm: number;
  key_signature: string;
  host_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Loop {
  id: string;
  room_id: string;
  user_id: string;
  name: string;
  file_url: string;
  order_index: number;
  is_active: boolean;
  volume: number;
  created_at: string;
  // UI helpers
  audio?: HTMLAudioElement;
  username?: string;
}

export interface Participant {
  room_id: string;
  user_id: string;
  joined_at: string;
  username?: string;
  avatar_url?: string;
}

export interface Mixdown {
  id: string;
  room_id: string;
  user_id: string;
  file_url: string;
  created_at: string;
  // UI helpers for Profile page
  roomTitle?: string;
  username?: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  username?: string;
}

// Audio Recording Types
export interface AudioRecorder {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  recordingTime: number;
  resetRecording: () => void;
}

// Theme Types
export type ThemeMode = 'light' | 'dark';
