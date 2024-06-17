import { Tables, AllUserActions } from "@shared/types";

export const messagesNeedResponse = (
  userActions: AllUserActions | Tables<"user_actions">[],
  userId?: number
) => {
  if (!userId) return false;
  return userActions[0]?.sender_id === userId;
};
