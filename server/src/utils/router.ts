import { Request, Response } from "express";
import supabase from "./supabase";
import { TableName } from "queries";

export const makeGenericGetRequest = (table: TableName, query: string) => {
  return async function (_: Request, response: Response) {
    console.log(`>>> REQUEST TO: ${table}`);
    try {
      const { data, error } = await supabase
        .from(table)
        .select(query)
        .order("id", { ascending: false });

      console.log(`>>> ${data.length} rows`);

      if (error) throw new Error(error.message);
      response.status(200).send(data);
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  };
};

export const makeGenericUpdateRequest = (table: TableName) => {
  return async function (request: Request, response: Response) {
    try {
      const { id, data: updateData } = request.body;
      const { data: _, error } = await supabase
        .from(table)
        .update(updateData)
        .match({ id });

      if (error) throw new Error(error.message);
      response.status(200).send("OK");
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  };
};
