import { Tables } from "@shared/types";
import { getUserActionById } from "../../database";
import {
  makeImageSection,
  makeTextSection,
  slackBot,
  supabase,
} from "../../utils";
import {
  RealtimeChannel,
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

/**
 *
 *
 * TYPES
 */
type Payload = RealtimePostgresChangesPayload<Tables<"user_actions">>;

/**
 *
 *
 * SEND MESSAGE NOTIFICATION FUNCTION
 */
async function _sendSlackNotification(id: number) {
  const userAction = await getUserActionById(id);
  if (!userAction) return;

  const { sender, text, image_path } = userAction;
  const senderName = sender.name ?? "[guest]";

  const blocks = [];
  blocks.push(makeTextSection(`*New message from ${senderName}*`));

  if (!!text) {
    blocks.push(makeTextSection(`_"${text}"_`));
  }

  if (!!image_path) {
    blocks.push(makeImageSection("Uploaded Image", image_path));
  }

  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}

/**
 *
 *
 * LISTENER
 */
let subscription: RealtimeChannel;
const _channel = "userMessagesListener";
const _type = "postgres_changes";
const _filter: RealtimePostgresChangesFilter<"INSERT"> = {
  event: "INSERT",
  schema: "public",
  table: "user_actions",
};

function _callback(payload: Payload) {
  if (payload.eventType === "INSERT") _sendSlackNotification(payload.new.id);
}

function _onSubscribe(status: string, error: Error) {
  console.info(`${_channel}: ${status}`);
  if (error) console.error(error);
  if (status !== "SUBSCRIBED") {
    supabase.removeChannel(subscription);
    subscription = null;
    _setUpListener();
  }
}

function _listen() {
  // subscription = supabase
  //   .channel(_channel)
  //   .on<Tables<"user_actions">>(_type, _filter, _callback)
  //   .subscribe(_onSubscribe);
}

function _setUpListener() {
  setTimeout(_listen, 5000);
}

_setUpListener();
