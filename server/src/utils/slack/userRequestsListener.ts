import { Tables } from "@shared/types";
import { getUserRequestById } from "../../database";
import {
  makeListSection,
  makeTextSection,
  slackBot,
  supabase,
} from "../../utils";
import {
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

/**
 *
 *
 * TYPES
 */
type Payload = RealtimePostgresChangesPayload<Tables<"user_requests">>;

/**
 *
 *
 * SEND MESSAGE NOTIFICATION FUNCTION
 */
async function _sendSlackNotification(payload: Payload) {
  if (payload.eventType === "DELETE") return;

  const isNew = payload.eventType === "INSERT";
  const request = await getUserRequestById(payload.new.id);
  if (!request) return;

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

  const blocks = [];

  // title
  const userName = user.name ?? "[guest]";
  const title = isNew
    ? `New Request for ${userName}`
    : `${userName} updated their request`;

  blocks.push(makeTextSection(`*${title} (ID: ${id})*`));

  const willChangeFloorPlan = will_change_floorplan ? "Yes" : "No";
  const isArchived = is_archived ? "Yes" : "No";
  const updatesString = update_types.map((i) => i.name).join(", ");

  blocks.push(
    makeListSection([
      `Status: ${status_type.name}`,
      `Room Type: ${room_type.name}`,
      `Updates: ${updatesString}`,
      `Description: "${description}"`,
      `Change Floorplan?: ${willChangeFloorPlan}`,
      `Archived?: ${isArchived}`,
    ])
  );

  // TODO: handle images and videos

  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}

/**
 *
 *
 * LISTENER
 */
const _channel = "userRequestsListener";
const _type = "postgres_changes";
const _filter: RealtimePostgresChangesFilter<"*"> = {
  event: "*",
  schema: "public",
  table: "user_requests",
};

function _callback(payload: Payload) {
  _sendSlackNotification(payload);
}

function _onSubscribe(status: string, error: Error) {
  console.info(`${_channel}: ${status}`);
  if (error) console.error(error);
}

function _listen() {
  supabase
    .channel(_channel)
    .on<Tables<"user_requests">>(_type, _filter, _callback)
    .subscribe(_onSubscribe);
}

setTimeout(_listen, 1000);
