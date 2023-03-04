import { useQuery } from "react-query";
import { API_SERVER } from "../utils/constants";
import { callApi } from "../utils/utils";

export function useFetchProductCategories() {
  async function fetchFn() {
    const { data } = await callApi(`${API_SERVER}/productCategories`);
    return data;
  }

  return useQuery(["product", "categories"], fetchFn);
}
