import { compact } from "lodash";
import { getUserById } from "../../database";
import { makeListSection, makeTextSection, slackBot } from "../../utils";

export async function handleUserInsertOrUpdate(userId: number, isNew: boolean) {
  const user = await getUserById(userId);
  if (!user) return;

  const { name, email, phone_number } = user;
  const userName = name ?? "[guest]";

  const titleString = isNew
    ? `*New User: ${userName} (ID: ${userId})*`
    : `*${userName} updated their profile (ID: ${userId})*`;

  const title = makeTextSection(titleString);

  const info = makeListSection([
    `Name: ${userName ?? "[guest]"}`,
    `Email: ${email ?? "[no email]"}`,
    `Phone Number: ${phone_number ?? "[no phone number]"}`,
  ]);

  const blocks = compact([title, info]);

  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}
