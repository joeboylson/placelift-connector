import { Client } from "@hubspot/api-client";

const { HUBSPOT_ACCESS_TOKEN } = process.env;

export const hubspotClient = new Client({ accessToken: HUBSPOT_ACCESS_TOKEN });
