import api from "@/helpers/api";

export type RespondRequestResponse = {
  success: boolean;
  message: string;
};

// Fetch users by gender
export const fetchUsersByGender = async (gender: string, page = 1, pageSize = 6) => {
  const res = await api.get(
    `/users/get_users?gender=${encodeURIComponent(gender)}&page=${page}&limit=${pageSize}`
  );
  return res.data;
};

export const fetchGenderCounts = async () => {
  const res = await api.get(`/users/gender-counts`);
  return res.data;
};

export const fetchUsersByStatus = async (status: string, page = 1, pageSize = 10) => {
  const res = await api.get(
    `/users/get_users?status=${encodeURIComponent(status)}&page=${page}&limit=${pageSize}`
  );
  return res.data;
};

// Respond to connection request
export async function respondToRequest(
  userId: string,
  status: "accepted" | "rejected"
): Promise<RespondRequestResponse> {
  const response = await api.post("/users/requests/respond", { user_id: userId, status });
  return response.data;
}

// Send connection request
export async function sendConnectionRequest(userId: string) {
  const response = await api.post(`/users/requests/send`, { user_id: userId });
  return response.data;
}

// Toggle save/unsave profile
export async function toggleSaveProfile(userId: string) {
  const response = await api.post(`/users/save-unsave`, { user_id: userId });
  return response.data;
}

// Toggle block/unblock user
export async function toggleBlockUser(userId: string) {
  const response = await api.post(`/users/block-unblock`, { user_id: userId });
  return response.data;
}

// Edit user profile
export const editUserProfile = async (data: any) => {
  const response = await api.post(`/users/edit-profile`, data);
  return response.data;
};

// Get user profile details
export const fetchProfileDetails = async (userId: string) => {
  const response = await api.get(`/users/view_profile/${userId}`);
  return response.data;
};

// Get notifications
export const fetchNotify = async (status: string) => {
  const response = await api.get(`/users/notification/${status}`);
  return response.data;
};

// Fetch specific user profile
export async function fetchUserProfile(userId: string) {
  const response = await api.get(`/viewprofile/${userId}`);
  return response.data;
}

// Blocked users
export async function fetchBlockedUsers(page = 1, limit = 10) {
  const response = await api.get(`/users/users/blocked`, { params: { page, limit } });
  return response.data;
}

// Saved users
export async function fetchSavedUsers(page = 1, limit = 10) {
  const response = await api.get(`/users/users/saved`, { params: { page, limit } });
  return response.data;
}

// Sent requests
export async function fetchSentRequests() {
  const response = await api.get(`/users/requests/sent`);
  return response.data;
}

// Pending requests
export async function fetchPendingRequest(page = 1, limit = 10) {
  const response = await api.get(`/users/requests/pending`, { params: { page, limit } });
  return response.data;
}

// Connections
export const fetchReceivedRequests = (page: number, limit: number) =>
  api.get(`/users/connections/received?page=${page}&limit=${limit}`).then(res => res.data);

export const fetchPendingRequests = (page: number, limit: number) =>
  api.get(`/users/connections/sent?page=${page}&limit=${limit}`).then(res => res.data);

export const fetchConnectedRequests = (page: number, limit: number) =>
  api.get(`/users/connections/connected?page=${page}&limit=${limit}`).then(res => res.data);

// Recommendations
export const fetchRecommended = (page: number, limit: number) =>
  api.get(`/users/recommended?page=${page}&limit=${limit}`).then(res => res.data);

export const fetchNearby = (page: number, limit: number) =>
  api.get(`/users/nearby?page=${page}&limit=${limit}`).then(res => res.data);

export const fetchNewProfile = (page: number, limit: number) =>
  api.get(`/users/new?page=${page}&limit=${limit}`).then(res => res.data);

// Chat
export async function getMessagesForUser(otherUserId: string) {
  const response = await api.get(`/chat/chat/history/${otherUserId}`);
  return response.data;
}

export async function getChatUsers() {
  const response = await api.get(`/chat/users_with_last_message`);
  return response.data;
}
