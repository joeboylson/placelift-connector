import { Tables } from "./supabase";

export type TypesApiOptions =
  | "action_types"
  | "event_types"
  | "preferred_contact_method_types"
  | "product_status_types"
  | "room_types"
  | "status_types"
  | "timing_option_types"
  | "update_types";

export type OptionsTable =
  | Tables<"action_types">
  | Tables<"event_types">
  | Tables<"preferred_contact_method_types">
  | Tables<"product_status_types">
  | Tables<"room_types">
  | Tables<"status_types">
  | Tables<"timing_option_types">
  | Tables<"update_types">;
