
export interface User {
  id: string;
  email: string;
  name: string;
  gender: string;
  dob: string;
  age: number;
  maritalStatus: string;
  education: string;
  occupation: string;
  language: string;
  height: string;
  diet: string;
  smoke: string;
  drink: string;
  city_name: string;
  postal: string;
  state: string;
  country: string;
  mobile: string;
  phonehide: boolean;
  mobilecode: string;
  partnerExpectations: string;
  bio: string;
  status: 'paid' | 'active' | 'banned' | 'deleted' | 'exclusive';
  memtype: string;
  membershipExpiryDate: string;
  photoProtect: boolean;
  chatcontact: boolean;
  devicetoken: string;
  pagecount: number;
  onlineUsers: boolean;
  mobileverify: boolean;
  verify_status: boolean;
  verify_email: boolean;
  video_min: number;
  voice_min: number;
  photo1: string;
  photo1Approve: boolean;
  photo2: string;
  photo2Approve: boolean;
  chat_msg: number;
  photohide: boolean;
  lastSeen?: Date;
   // New fields from API
  isMatched?: boolean;
  match_status?: string;  // "sent" | "pending" | "none" | "accepted"
  isBlocked?: boolean;
  isSaved?: boolean;
}

export interface Connection {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'video';
}

export const GENDER_OPTIONS = {
  //"All": "All",
  "Lesbian": "Lesbian",
  "Gay": "Gay",
  "Bisexual | Man": "Bisexual | Man",
  "Bisexual | Woman": "Bisexual | Woman",
  "Transgender | Man": "Transgender | Man",
  "Transgender | Women": "Transgender | Women",
  "Queer": "Queer",
  "Intersex": "Intersex",
  "Asexual": "Asexual",
  "Nonbinary": "Nonbinary",
  "+ PLUS": "+ PLUS"
};

interface EditProfileResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    occupation?: string;
    education?: string;
    city_name?: string;
    partnerExpectations?: string;
    phonehide?: boolean;
    photoProtect?: boolean;
    photo1?: string;
    photo2?: string;
  };
}
