import { getUserRequestById } from "../../database";
import { makeListSection, makeTextSection, slackBot } from "../../utils";
import { compact } from "lodash";

export async function handleRequestInsertOrUpdate(
  requestId: number,
  isNew: boolean
) {
  const request = await getUserRequestById(requestId);
  if (!request) return;

  // extract data
  const {
    id,
    description,
    will_change_floorplan,
    is_archived,
    images,
    videos,
    // relations
    user,
    room_type,
    status_type,
    update_types,
  } = request;

  // do some data manipulation
  const userName = user.name ?? "[guest]";
  const titleString = isNew
    ? `New Request for ${userName}`
    : `${userName} updated their request`;

  const willChangeFloorPlan = will_change_floorplan ? "Yes" : "No";
  const isArchived = is_archived ? "Yes" : "No";
  const updatesString = update_types.map((i) => i.name).join(", ");

  // make blocks
  const title = makeTextSection(`*${titleString} (ID: ${id})*`);

  const infoList = makeListSection([
    `Status: ${status_type?.name ?? "No Status"}`,
    `Room Type: ${room_type?.name ?? "No Room Type"}`,
    `Updates: ${updatesString}`,
    `Description: "${description}"`,
    `Change Floorplan?: ${willChangeFloorPlan}`,
    `Archived?: ${isArchived}`,
  ]);

  const imageLinks = makeListSection(images ?? []);
  const videoLinks = makeListSection(videos ?? []);

  const blocks = compact([title, infoList, imageLinks, videoLinks]);

  // TODO: handle images and videos
  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}
