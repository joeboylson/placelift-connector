import { Tables } from "@shared/types";
import { getUserById } from "../../database";
import {
  makeListSection,
  makeTextSection,
  slackBot,
  supabase,
} from "../../utils";
import {
  RealtimeChannel,
  RealtimePostgresChangesFilter,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

/**
 *
 *
 * TYPES
 */
type Payload = RealtimePostgresInsertPayload<Tables<"users">>;

/**
 *
 *
 * SEND MESSAGE NOTIFICATION FUNCTION
 */
async function _sendSlackNotification(id: number) {
  const user = await getUserById(id);
  if (!user) return;

  const { name, email, phone_number } = user;
  const userName = name ?? "[guest]";

  const blocks = [];

  blocks.push(makeTextSection(`*New user created (ID: ${id})*`));

  blocks.push(
    makeListSection([
      `Name: ${userName ?? "[guest]"}`,
      `Email: ${email ?? "[no email]"}`,
      `Phone Number: ${phone_number ?? "[no phone number]"}`,
    ])
  );

  const channel = "C06HGHXRML7";
  await slackBot.chat.postMessage({ channel, blocks });
}

/**
 *
 *
 * LISTENER
 */
let subscription: RealtimeChannel;
const _channel = "usersListener";
const _type = "postgres_changes";
const _filter: RealtimePostgresChangesFilter<"INSERT"> = {
  event: "INSERT",
  schema: "public",
  table: "users",
};

function _callback(payload: Payload) {
  _sendSlackNotification(payload.new.id);
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
  subscription = supabase
    .channel(_channel)
    .on<Tables<"users">>(_type, _filter, _callback)
    .subscribe(_onSubscribe);
}

function _setUpListener() {
  setTimeout(_listen, 5000);
}

_setUpListener();
