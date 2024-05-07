import { hubspotClient } from "../hubspot";
import supabase from "../supabase";
import { Tables } from "supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import {
  FilterOperatorEnum,
  SimplePublicObjectInput,
  SimplePublicObjectInputForCreate,
} from "@hubspot/api-client/lib/codegen/crm/contacts";

/**
 *
 *
 * SUPABASE
 */

export async function getAllSupabaseUsers() {
  const { data } = await supabase.from("users").select("*");
  return data;
}

export async function handleOnCreateOrUpdateSupabaseUser(
  data: RealtimePostgresChangesPayload<Tables<"users">>
) {
  // filter out empty objects
  if (Object.keys(data.new).length === 0) return;

  // object is not empty -- OK to cast
  const newData = data.new as Tables<"users">;

  // validate the supabase user
  if (!newData.email) return;
  if (newData.is_guest) return;
  if (newData.is_archived) return;

  // check is user hubspot user already exists
  const existingUser = await getHubSpotUserByPlaceLiftId(newData.id.toString());

  if (!existingUser) return createHubSpotUserFromSupabaseUser(newData);
  return updateHubSpotUserFromSupabaseUser(newData);
}

supabase
  .channel("room1")
  .on<Tables<"users">>(
    "postgres_changes",
    { event: "*", schema: "public", table: "users" },
    (payload) => {
      // handle new users
      if (payload.eventType === "INSERT")
        return handleOnCreateOrUpdateSupabaseUser(payload);

      // handle new users
      if (payload.eventType === "UPDATE")
        return handleOnCreateOrUpdateSupabaseUser(payload);
    }
  )
  .subscribe();

/**
 *
 *
 * HUBSPOT
 * https://www.npmjs.com/package/@hubspot/api-client
 */
export const getHubSpotUserByPlaceLiftId = async (placeliftId: string) => {
  const hubSpotQueryResult =
    await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "placelift_id",
              operator: FilterOperatorEnum.Eq,
              value: placeliftId,
            },
          ],
        },
      ],
      sorts: ["createdate"],
      limit: 100,
      properties: ["email, firstname, phone, placelift_id"],
      after: undefined,
    });

  if (hubSpotQueryResult.total === 0) return null;
  return hubSpotQueryResult.results[0];
};

export async function createHubSpotUserFromSupabaseUser(
  supabaseUser: Tables<"users">
) {
  // validate the supabase user
  if (!supabaseUser.email) return;
  if (supabaseUser.is_guest) return;
  if (supabaseUser.is_archived) return;

  const properties = {
    email: supabaseUser.email,
    firstname: supabaseUser.name,
    phone: supabaseUser.phone_number,
    placelift_id: supabaseUser.id.toString(),
  };

  console.log(">>> CREATING NEW HUBSPOT USER");
  console.log(properties);

  const newHubSpotContact: SimplePublicObjectInputForCreate = {
    properties,
    associations: [],
  };

  await hubspotClient.crm.contacts.basicApi.create(newHubSpotContact);
}

export async function updateHubSpotUserFromSupabaseUser(
  supabaseUser: Tables<"users">
) {
  const hubSpotUser = await getHubSpotUserByPlaceLiftId(
    supabaseUser.id.toString()
  );

  if (!hubSpotUser) return;

  // IDS
  const hubSpotId = hubSpotUser.id;
  const placeLiftId = supabaseUser.id;

  const properties = {
    email: supabaseUser.email,
    firstname: supabaseUser.name,
    phone: supabaseUser.phone_number,
  };

  console.log(`>>> UPDATING HUBSPOT USER: [H-${hubSpotId}] [P-${placeLiftId}]`);
  console.log(properties);

  const updatedHubSpotContact: SimplePublicObjectInput = { properties };

  await hubspotClient.crm.contacts.basicApi.update(
    hubSpotId,
    updatedHubSpotContact
  );
}

/**
 *
 *
 * SYNC
 */

export async function syncUsersAndContacts() {
  const allSupabaseUsers = await getAllSupabaseUsers();

  /**
   * Make sure all the supabase users exist in HubSpot
   */

  // use for loop to keep async scope
  for (let i = 0; i < allSupabaseUsers.length; i++) {
    const supabaseUser = allSupabaseUsers[i];

    // validate the supabase user
    if (!supabaseUser.email) continue;
    if (supabaseUser.is_guest) continue;
    if (supabaseUser.is_archived) continue;

    const matchingHubSpotUser = await getHubSpotUserByPlaceLiftId(
      supabaseUser.id.toString()
    );

    if (!matchingHubSpotUser) {
      await createHubSpotUserFromSupabaseUser(supabaseUser);
    }

    // perform 2 updates (max) per second
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(">>> COMPLETED: syncUsersAndContacts()");
  //
}
