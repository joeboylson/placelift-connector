import { Database } from "@shared/types";

export type TableName = keyof Database["public"]["Tables"];
