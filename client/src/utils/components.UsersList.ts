import { AvatarOwnProps } from "@mui/material";
import { UsersWithRelations } from "@shared/types";

export const getAvatarProps = (user: UsersWithRelations) => {
  return (
    user.image_path
      ? {
          alt: user.name ?? "",
          src: user.image_path,
        }
      : {
          children: `${(user.name ?? "Guest")[0]}`,
        }
  ) as AvatarOwnProps;
};
