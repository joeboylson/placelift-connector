import { WebClient } from "@slack/web-api";

const SLACK_BOT_OAUTH_TOKEN = process.env.SLACK_BOT_OAUTH_TOKEN;
export const slackBot = new WebClient(SLACK_BOT_OAUTH_TOKEN);

export * from "./blocks";
export * from "./userMessagesListener";
export * from "./userRequestsListener";
export * from "./usersListener";
