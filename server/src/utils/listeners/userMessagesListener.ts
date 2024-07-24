import { getUserActionById } from "../../database";
import { makeImageSection, makeTextSection, slackBot } from "../../utils";
import { compact } from "lodash";

export async function handleMessageInsert(userActionId: number) {
  const userAction = await getUserActionById(userActionId);
  if (!userAction) return;

  const { sender, text, image_path } = userAction;
  const senderName = sender.name ?? "[guest]";

  const title = makeTextSection(`*New message from ${senderName}*`);
  const message = text && makeTextSection(`_"${text}"_`);
  const image = image_path && makeImageSection("Uploaded Image", image_path);

  const blocks = compact([title, message, image]);

  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}
