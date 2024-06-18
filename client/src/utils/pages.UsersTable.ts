import { compact } from "lodash";
import { AllUsers, Tables, UsersWithRelations } from "@shared/types";
import { ChipOwnProps, TabOwnProps } from "@mui/material";
import { UsersTableTabs, usersTableTabsValues } from "../enums/usersTable";
import {
  ALL_UNARCHIVED_USERS,
  ALL_USERS,
  USERS_ARE_NOT_GUESTS,
  USERS_HAVE_EMAIL,
  USERS_HAVE_NAME,
  USERS_HAVE_PHONE_NUMBER,
} from "../constants/users";

export const getUserIsProspect = (
  user: Tables<"users"> | UsersWithRelations
) => {
  if (!("user_homes" in user)) return;
  if (!("user_requests" in user)) return;

  const numberOfUserHomes = user.user_homes.length;
  const numberOfUserRequests = user.user_requests.length;

  return (
    !user.is_archived &&
    numberOfUserHomes > 0 &&
    numberOfUserRequests === 0 &&
    (!!user.email || !!user.phone_number)
  );
};

export const getRowCalculations = (user: UsersWithRelations) => {
  const numberOfUserHomes = user.user_homes.length;
  const numberOfUserRequests = user.user_requests.length;
  const numberOfSpamUserRequests = user.user_requests.filter(
    (i) => i.is_spam
  ).length;

  return {
    numUH: numberOfUserHomes,
    numUR: numberOfUserRequests,
    numSpUR: numberOfSpamUserRequests,
  };
};

export const getChipValues = (user: UsersWithRelations) => {
  const { numUH, numUR, numSpUR } = getRowCalculations(user);
  const _sharedProps = { size: "small" };

  return compact([
    { ..._sharedProps, label: `# Homes: ${numUH}` },
    { ..._sharedProps, label: `# Requests: ${numUR}` },
    { ..._sharedProps, label: `# Spam Requests: ${numSpUR}` },
  ]) as ChipOwnProps[];
};

export const getTabValues = () => {
  return usersTableTabsValues.map((tab) => {
    return { label: tab, value: tab };
  }) as TabOwnProps[];
};

export const getSubtitleText = (tab: UsersTableTabs) => {
  if (tab === UsersTableTabs.HIDE_GUESTS) return USERS_ARE_NOT_GUESTS;
  if (tab === UsersTableTabs.HAS_EMAIL) return USERS_HAVE_EMAIL;
  if (tab === UsersTableTabs.HAS_PHONE_NUMBER) return USERS_HAVE_PHONE_NUMBER;
  if (tab === UsersTableTabs.HAS_NAME) return USERS_HAVE_NAME;
  if (tab === UsersTableTabs.ALL_UNARCHIVED) return ALL_UNARCHIVED_USERS;
  if (tab === UsersTableTabs.ALL) return ALL_USERS;
  return "...";
};

export const getUsersForTab = (tab: UsersTableTabs, users: AllUsers) => {
  if (tab === UsersTableTabs.ALL) return users;

  const unarchivedUsers = users.filter((i) => i.is_archived === false);
  if (tab === UsersTableTabs.ALL_UNARCHIVED) return unarchivedUsers;
  if (tab === UsersTableTabs.HIDE_GUESTS)
    return unarchivedUsers.filter((i) => i.is_guest === false);
  if (tab === UsersTableTabs.HAS_EMAIL)
    return unarchivedUsers.filter((i) => !!i.email);
  if (tab === UsersTableTabs.HAS_PHONE_NUMBER)
    return unarchivedUsers.filter((i) => !!i.phone_number === true);
  if (tab === UsersTableTabs.HAS_NAME)
    return unarchivedUsers.filter((i) => !!i.name === true);
  return [];
};
