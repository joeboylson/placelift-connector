import { Database, Tables } from "./supabase";

export type UserActionsColumns =
  keyof Database["public"]["Tables"]["user_actions"]["Row"];

export type UserActionsFilter = {
  key: UserActionsColumns;
  value: string;
};

export type UserActionsWithRelations = Tables<"user_actions"> & {
  user: Tables<"users">;
  sender: Tables<"users">;
};

export type AllUserActions = UserActionsWithRelations[];
