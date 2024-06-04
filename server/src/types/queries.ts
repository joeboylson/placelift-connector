import { Database } from "supabase";

export type TableName = keyof Database["public"]["Tables"];
