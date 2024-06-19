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

export const scrollListToSelectedItem = (element: HTMLDivElement) => {
  // get list bounds
  const elementBounds = element.getBoundingClientRect();

  // get parent bounds
  const parent = element.parentElement;
  const parentBounds = parent?.getBoundingClientRect();

  // UX/UI offset (this is an arbitrary value)
  const offset = 144;

  // calculate top
  const top = elementBounds.y - (parentBounds?.y ?? 0) - offset;

  // do scroll
  element.parentElement?.scrollBy({ top, behavior: "smooth" });
};
