import { TypesApiOptions, OptionsTable } from "@shared/types";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

type OptionsArray = OptionsTable[];

export function useTypesAPI(typeApiOption: TypesApiOptions) {
  const [types, setTypes] = useState<OptionsArray>();
  const [typesApiFilter, setTypesApiFilter] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL_BASE = `/api/${typeApiOption}`;
  const API_GET_URL = `${API_URL_BASE}/get`;

  const getAllTypes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as OptionsArray;
      setTypes(data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [API_GET_URL]);

  const refresh = useCallback(() => {
    if (types === undefined) getAllTypes();
  }, [getAllTypes, types]);

  const filteredTypes = useMemo(() => {
    if (types === undefined) return [];
    if (!typesApiFilter) return types;
    return types.filter((i) => {
      const userSearchValue = JSON.stringify([i.id, i.name]).toLowerCase();
      return userSearchValue.toLowerCase().includes(typesApiFilter);
    });
  }, [types, typesApiFilter]);

  useEffect(refresh, [refresh]);

  return {
    loading,
    types: filteredTypes,
    getAllTypes,
    setTypesApiFilter: debounce(setTypesApiFilter, 200),
  };
}
