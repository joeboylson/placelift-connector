import { Tables } from "./supabase";

export type UsersWithRelations = Tables<"users"> & {
  user_homes: Tables<"user_homes">[];
  user_requests: Tables<"user_requests">[];
  user_actions: Tables<"user_actions">[];
};

export type AllUsers = UsersWithRelations[];
