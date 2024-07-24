import { Tables } from "@shared/types";
import { SupabaseListener } from "../supabaseListener";
import { handleRequestInsertOrUpdate } from "./userRequestsListener";
import { handleMessageInsert } from "./userMessagesListener";
import { handleUserInsertOrUpdate } from "./userListener";

export const supabaseListenerInstance = new SupabaseListener();
supabaseListenerInstance.listen();

supabaseListenerInstance.addListenerFunction({
  eventType: "INSERT",
  table: "user_requests",
  function(payload) {
    const newRequest = payload.new as Tables<"user_requests">;
    handleRequestInsertOrUpdate(newRequest.id, true);
  },
});

supabaseListenerInstance.addListenerFunction({
  eventType: "UPDATE",
  table: "user_requests",
  function(payload) {
    const updatedRequest = payload.new as Tables<"user_requests">;
    handleRequestInsertOrUpdate(updatedRequest.id, false);
  },
});

supabaseListenerInstance.addListenerFunction({
  eventType: "INSERT",
  table: "user_actions",
  function(payload) {
    const newMessage = payload.new as Tables<"user_actions">;
    handleMessageInsert(newMessage.id);
  },
});

supabaseListenerInstance.addListenerFunction({
  eventType: "INSERT",
  table: "users",
  function(payload) {
    const newUser = payload.new as Tables<"users">;
    handleUserInsertOrUpdate(newUser.id, true);
  },
});

supabaseListenerInstance.addListenerFunction({
  eventType: "UPDATE",
  table: "users",
  function(payload) {
    const updatedUser = payload.new as Tables<"users">;
    handleUserInsertOrUpdate(updatedUser.id, false);
  },
});
