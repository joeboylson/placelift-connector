import { Tables } from "./supabase";

export type UsersWithRelations = Tables<"users"> & {
  user_homes: Tables<"user_homes">[];
  user_requests: Tables<"user_requests">[];
};

export type AllUsers = UsersWithRelations[];
