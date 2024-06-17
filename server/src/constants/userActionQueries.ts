export const getAllUserActionsWithRelations = `
    *,
    sender:sender_id(*),
    action_type:action_type_id(*),
    user:user_id(*)
`;
