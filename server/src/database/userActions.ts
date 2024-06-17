import { supabase } from "~/utils";
import { getAllUserActionsWithRelations } from "~/constants";
import { UserActionsWithRelations } from "@shared/types";

export async function getUserActionById(id: number) {
  try {
    const { data: _data, error } = await supabase
      .from("user_actions")
      .select(getAllUserActionsWithRelations)
      .match({ id })
      .single();

    if (error) throw error;
    return _data as unknown as UserActionsWithRelations;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFilteredUserActionsByKey(key: string, value: string) {
  try {
    const { data, error: _ } = await supabase
      .from("user_actions")
      .select(getAllUserActionsWithRelations)
      .match({ [key]: value })
      .order("id", { ascending: false });

    return data as unknown as UserActionsWithRelations;
  } catch (error) {
    console.error(error);
    return null;
  }
}
