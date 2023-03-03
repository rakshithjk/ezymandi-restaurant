import axios from "axios";
import { useQuery } from "react-query";
import { API_SERVER } from "../utils/constants";

export function useFetchProductCategories() {
  async function fetchFn() {
    const { data } = await axios.get(`${API_SERVER}/productCategories`);
    return data;
  }

  return useQuery(["product", "categories"], fetchFn);
}
