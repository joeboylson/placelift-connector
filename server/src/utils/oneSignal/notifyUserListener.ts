import * as OneSignal from "@onesignal/node-onesignal";

const ONESIGNAL_USER_AUTH_KEY = process.env.ONESIGNAL_USER_AUTH_KEY;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;

import { Tables } from "@shared/types";
import { supabase } from "~/utils";
import {
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
 * CONSTANTS
 */

/**
 *
 *
 * SEND MESSAGE NOTIFICATION FUNCTION
 */

const sendOneSignalNotification = async (
  userId: string,
  senderName: string,
  message: string
) => {
  const configuration = OneSignal.createConfiguration({
    userKey: ONESIGNAL_USER_AUTH_KEY,
    appKey: ONESIGNAL_REST_API_KEY,
  });

  const oneSignalClient = new OneSignal.DefaultApi(configuration);

  try {
    const notification = new OneSignal.Notification();

    notification.app_id = ONESIGNAL_APP_ID;
    notification.include_external_user_ids = [userId];
    notification.contents = { en: message };
    notification.headings = { en: `${senderName} sent you a message` };

    await oneSignalClient.createNotification(notification);
  } catch (err) {
    console.error("Failed to create OneSignal notification");
    console.error({ err });
    //  {
    //    err: Error: HTTP-Code: 400
    //    Message: Bad Request
    //    Body: {"errors":["Invalid app_id format"]}
    //    Headers: {"alt-svc":"h3=\":443\"; ma=86400","cache-control":"no-cache","cf-cache-status":"DYNAMIC","cf-ray":"89541a8b0cddb02a-ATL","connection":"keep-alive","content-type":"application/json; charset=utf-8","date":"Mon, 17 Jun 2024 15:34:25 GMT","referrer-policy":"strict-origin-when-cross-origin","server":"cloudflare","set-cookie":"__cf_bm=F5.LfdzdeTZ8Z6n4rDzzBF9u0v0bKW16fomxwUFJGqM-1718638465-1.0.1.1-w3y9336.V4LKTgSp.FeA.v23LDRdIt.lvpArF4OzIiX_m8X1VBdtFaV4VG_FW2PDAop6dGVLRq0nEuwusTIISw; path=/; expires=Mon, 17-Jun-24 16:04:25 GMT; domain=.onesignal.com; HttpOnly; Secure; SameSite=None","strict-transport-security":"max-age=15552000; includeSubDomains","transfer-encoding":"chunked","vary":"Origin","via":"1.1 google","x-content-type-options":"nosniff","x-download-options":"noopen","x-frame-options":"SAMEORIGIN","x-permitted-cross-domain-policies":"none","x-request-id":"fd06c00e-eca9-4b00-a0e8-b96a9f520714","x-runtime":"0.003191","x-xss-protection":"1; mode=block"}
    //        at new ApiException (/Users/joeboylson/@/1_Projects/placelift-connector/server/node_modules/@onesignal/node-onesignal/apis/exception.ts:12:9)
    //        at DefaultApiResponseProcessor.<anonymous> (/Users/joeboylson/@/1_Projects/placelift-connector/server/node_modules/@onesignal/node-onesignal/apis/DefaultApi.ts:2173:19)
    //        at step (/Users/joeboylson/@/1_Projects/placelift-connector/server/node_modules/@onesignal/node-onesignal/dist/apis/DefaultApi.js:48:23)
    //        at Object.next (/Users/joeboylson/@/1_Projects/placelift-connector/server/node_modules/@onesignal/node-onesignal/dist/apis/DefaultApi.js:29:53)
    //        at fulfilled (/Users/joeboylson/@/1_Projects/placelift-connector/server/node_modules/@onesignal/node-onesignal/dist/apis/DefaultApi.js:20:58)
    //        at processTicksAndRejections (node:internal/process/task_queues:95:5) {
    //      code: 400,
    //      body: BadRequestError { errors: [Array] },
    //      headers: {
    //        'alt-svc': 'h3=":443"; ma=86400',
    //        'cache-control': 'no-cache',
    //        'cf-cache-status': 'DYNAMIC',
    //        'cf-ray': '89541a8b0cddb02a-ATL',
    //        connection: 'keep-alive',
    //        'content-type': 'application/json; charset=utf-8',
    //        date: 'Mon, 17 Jun 2024 15:34:25 GMT',
    //        'referrer-policy': 'strict-origin-when-cross-origin',
    //        server: 'cloudflare',
    //        'set-cookie': '__cf_bm=F5.LfdzdeTZ8Z6n4rDzzBF9u0v0bKW16fomxwUFJGqM-1718638465-1.0.1.1-w3y9336.V4LKTgSp.FeA.v23LDRdIt.lvpArF4OzIiX_m8X1VBdtFaV4VG_FW2PDAop6dGVLRq0nEuwusTIISw; path=/; expires=Mon, 17-Jun-24 16:04:25 GMT; domain=.onesignal.com; HttpOnly; Secure; SameSite=None',
    //        'strict-transport-security': 'max-age=15552000; includeSubDomains',
    //        'transfer-encoding': 'chunked',
    //        vary: 'Origin',
    //        via: '1.1 google',
    //        'x-content-type-options': 'nosniff',
    //        'x-download-options': 'noopen',
    //        'x-frame-options': 'SAMEORIGIN',
    //        'x-permitted-cross-domain-policies': 'none',
    //        'x-request-id': 'fd06c00e-eca9-4b00-a0e8-b96a9f520714',
    //        'x-runtime': '0.003191',
    //        'x-xss-protection': '1; mode=block'
    //      }
    //    }
    //  }
  }
};

async function sendAppNotification(payload: Payload) {
  if (payload.eventType === "DELETE") return;

  const { user_id, sender_id, text } = payload.new;

  // PROJECT MANAGER (OR SOME OTHER USER) SENT THE MESSAGE
  if (user_id !== sender_id) {
    const { data: sender, error } = await supabase
      .from("users")
      .select("*")
      .match({ id: user_id })
      .single();

    if (error) {
      console.error(`ERROR: ${error}`);
      return;
    }

    const userId = user_id.toString();
    const senderName = sender.name;

    await sendOneSignalNotification(userId, senderName, text);
  }
}
/**
 *
 *
 * LISTENER
 */
const _channel = "notifyUserListener";
const _type = "postgres_changes";
const _filter: RealtimePostgresChangesFilter<"INSERT"> = {
  event: "INSERT",
  schema: "public",
  table: "user_actions",
};

function _callback(payload: Payload) {
  if (payload.eventType === "INSERT") sendAppNotification(payload);
}

function _onSubscribe(status: string, error: Error) {
  console.info(`${_channel}: ${status}`);
  if (error) console.error(error);
}

function _listen() {
  supabase
    .channel(_channel)
    .on<Tables<"user_actions">>(_type, _filter, _callback)
    .subscribe(_onSubscribe);
}

// TODO
// setTimeout(_listen, 1000);
// setTimeout(() => {
//   sendOneSignalNotification("504", "TEST", "TEST DATA");
// }, 3000);
