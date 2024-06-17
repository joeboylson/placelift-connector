import { getAllUsersWithProjectManagerProfile } from "~/constants";
import { supabase } from "~/utils";

export async function getIsAuthUserAProjectManager() {
  const isProduction = process.env.MODE === "production";
  if (!isProduction) return true;

  try {
    const {
      data: {
        user: { email },
      },
    } = await supabase.auth.getUser();

    if (!email) return false;

    const { data: user, error } = await supabase
      .from("users")
      .select(getAllUsersWithProjectManagerProfile)
      .eq("email", email)
      .single();

    if (error) throw new Error(error.message);
    const projectMangerProfile = user["project_manager_profile"][0];
    return projectMangerProfile["user_id"] === user["id"];
  } catch {
    return false;
  }
}
