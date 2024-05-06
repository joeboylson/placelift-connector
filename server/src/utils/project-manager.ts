import supabase from "./supabase";

export async function getIsAuthUserAProjectManager() {
  try {
    const {
      data: {
        user: { email },
      },
    } = await supabase.auth.getUser();

    if (!email) return false;

    const { data: user, error } = await supabase
      .from("users")
      .select(`*, project_manager_profile(*)`)
      .eq("email", email)
      .single();

    if (error) throw new Error(error.message);

    const projectMangerProfile = user["project_manager_profile"][0];
    return projectMangerProfile["user_id"] === user["id"];
  } catch {
    return false;
  }
}
