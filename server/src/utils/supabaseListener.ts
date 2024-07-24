import { supabase } from "./supabase";
import { v4 as generateUUID } from "uuid";
import { AllTableNames, Tables } from "@shared/types";
import {
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { makeTextSection, slackBot } from "./slack";

type Payload = RealtimePostgresChangesPayload<Tables<any>>;

interface SupabaseListenerFunction {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  table: AllTableNames;
  function: (payload: Payload) => void;
}

export class SupabaseListener {
  isListening: boolean;
  subscription: any;
  type: "postgres_changes";
  filter: RealtimePostgresChangesFilter<"*">;
  retryAttempts: number;
  listenerFunctions: SupabaseListenerFunction[];

  constructor() {
    this.isListening = false;
    this.type = "postgres_changes";
    this.filter = {
      event: "*",
      schema: "*",
    };
    this.retryAttempts = 0;
    this.listenerFunctions = [];
  }

  sendSlackNotification(message: string) {
    const blocks = [makeTextSection(`*Listener Notification:* ${message}`)];
    const channel = "C06HGHXRML7";
    slackBot.chat.postMessage({ channel, blocks });
  }

  resetRetryDelay() {
    this.retryAttempts = 0;
  }

  incrementRetryDelay() {
    this.retryAttempts = this.retryAttempts + 1;

    if (this.retryAttempts >= 10) {
      let _message = `>>> ERROR: SupabaseListener has restarted 10 or more times.`;
      this.sendSlackNotification(_message);
    }
  }

  generateChannelName() {
    const _channelName = `listener-${generateUUID()}`;
    console.log(`>>> GENERATING NEW LISTENER CHANNEL: ${_channelName}`);
    return `listener-${generateUUID()}`;
  }

  handleDatabaseEvent(payload: Payload) {
    this.listenerFunctions.forEach((i) => {
      if (i.eventType === payload.eventType && i.table === payload.table) {
        i.function(payload);
      }
    });
  }

  handleOnSubscriptionChange(status: string, error: Error) {
    switch (status) {
      /**
       *
       */
      case "CHANNEL_ERROR":
        console.group(">>> CHANNEL_ERROR");
        if (error) console.log({ error });
        console.groupEnd();
        supabase.removeChannel(this.subscription);
        break;

      /**
       *
       */
      case "TIMED_OUT":
        console.group(">>> TIMED_OUT");
        if (error) console.log({ error });
        console.groupEnd();
        supabase.removeChannel(this.subscription);
        break;

      /**
       *
       */
      case "CLOSED":
        if (error) console.log({ error });

        // update class state
        this.isListening = false;
        this.incrementRetryDelay();

        // retry after delay
        const delay = this.retryAttempts * 3000;
        setTimeout(() => this.listen(), delay);

        // end
        break;
      /**
       *
       */
      case "SUBSCRIBED":
        console.log(`>>> SupabaseListener ONLINE`);
        this.isListening = true;
        this.resetRetryDelay();
        break;
    }
  }

  listen() {
    if (!this.isListening) {
      this.subscription = supabase
        .channel(this.generateChannelName())
        .on<Tables<any>>(
          "postgres_changes",
          { event: "*", schema: "*" },
          (_p) => this.handleDatabaseEvent(_p)
        )
        .subscribe((status: string, error: Error) =>
          this.handleOnSubscriptionChange(status, error)
        );
    }
  }

  addListenerFunction(listenerFunction: SupabaseListenerFunction) {
    this.listenerFunctions = [...this.listenerFunctions, listenerFunction];
  }
}
