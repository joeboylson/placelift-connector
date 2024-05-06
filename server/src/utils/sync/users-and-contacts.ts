import { hubspotClient } from "../hubspot";

export async function getAllHubSpotUsers() {
  const hubSpotUsers = await hubspotClient.crm.contacts.getAll();
  console.log(hubSpotUsers);
}
