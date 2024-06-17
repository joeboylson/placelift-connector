import { supabase } from "~/utils";
import { getAllUserRequestWithRelations } from "~/constants";
import { UserRequestWithRelations } from "@shared/types";

export async function getUserRequestById(id: number) {
  try {
    const { data: _data, error } = await supabase
      .from("user_requests")
      .select(getAllUserRequestWithRelations)
      .match({ id })
      .single();

    if (error) throw error;
    return _data as unknown as UserRequestWithRelations;
  } catch (error) {
    console.error(error);
    return null;
  }
}
