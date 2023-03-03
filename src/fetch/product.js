import axios from "axios";
import { useQuery } from "react-query";
import { API_SERVER } from "../utils/constants";

export function useFetchProduct(productId, options = {}) {
  async function fetchFn() {
    const { data } = await axios.get(`${API_SERVER}/products/${productId}`);
    return data;
  }

  return useQuery(["product", "individual", productId], fetchFn, options);
}

export function useListProduct(filter = "", options = {}) {
  async function fetchFn() {
    const { data } = await axios.get(`${API_SERVER}/products?${filter}`);
    return data;
  }

  return useQuery(["product", "list"], fetchFn, options);
}
