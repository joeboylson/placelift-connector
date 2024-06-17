import { supabase } from "../utils";
import { getAllUsersWithRelations } from "../constants";
import { UsersWithRelations } from "@shared/types";

export async function getUserById(id: number) {
  try {
    const { data: _data, error } = await supabase
      .from("users")
      .select(getAllUsersWithRelations)
      .match({ id })
      .single();

    if (error) throw error;
    return _data as unknown as UsersWithRelations;
  } catch (error) {
    console.error(error);
    return null;
  }
}
