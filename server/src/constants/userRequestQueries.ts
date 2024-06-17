export const getAllUserRequestWithRelations = `
    *,
    user:users(*),
    room_type:room_types(*),
    status_type:status_types(*),
    update_types(*)
`;
