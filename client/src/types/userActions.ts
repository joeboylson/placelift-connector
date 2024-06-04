import { Tables } from "./supabase";

export type UserActionsWithRelations = Tables<"user_actions"> & {
  user: Tables<"users">;
  sender: Tables<"users">;
};

export type AllUserActions = UserActionsWithRelations[];
