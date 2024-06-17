import { Database } from "./supabase";

export type AllTableNames = keyof Database["public"]["Tables"];
