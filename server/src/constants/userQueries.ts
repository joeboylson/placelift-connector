export const getAllUsersWithRelations = `
    *,
    user_homes(*),
    user_requests(*),
    user_actions!user_actions_user_id_fkey(*)
`;

export const getAllUsersWithProjectManagerProfile = `
    *,
    project_manager_profile(*)
`;
