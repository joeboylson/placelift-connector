import { Tables } from "./supabase";

export type UserRequestWithRelations = Tables<"user_requests"> & {
  user: Tables<"users">;
  status_type: Tables<"status_types">;
  room_type: Tables<"room_types">;
  update_types: Tables<"update_types">[];
};

export type AllRequests = UserRequestWithRelations[];
