import { Request, Response } from "express";
import { TableName } from "queries";
import { supabase } from "../utils";

export const makeGenericGetRequest = (table: TableName, query: string) => {
  return async function (_: Request, response: Response) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(query)
        .order("id", { ascending: false });

      if (error) throw new Error(error.message);
      response.status(200).send(data);
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  };
};

export const makeGenericUpdateRequest = (table: TableName, query: string) => {
  return async function (request: Request, response: Response) {
    try {
      const { id, data: updateData } = request.body;

      const { data, error } = await supabase
        .from(table)
        .update(updateData)
        .match({ id })
        .select(query)
        .single();

      if (error) throw new Error(error.message);
      response.status(200).send(data);
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  };
};
