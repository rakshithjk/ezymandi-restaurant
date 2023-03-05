import { useQuery } from "react-query";
import { API_SERVER } from "../utils/constants";
import { callApi } from "../utils/utils";

export function useFetchProduct(productId, options = {}) {
  async function fetchFn() {
    const { data } = await callApi(`${API_SERVER}/products/${productId}`);
    return data;
  }

  return useQuery(["product", "individual", productId], fetchFn, options);
}

export function useListProduct(filter = "", options = {}) {
  async function fetchFn() {
    const { data } = await callApi(`${API_SERVER}/products?${filter}`);
    return data;
  }

  return useQuery(["product", "list"], fetchFn, options);
}

export function useFetchSimilarProduct(productId, options = {}, a) {
  console.log("productId", productId);
  async function fetchFn(id) {
    const { data } = await callApi(`${API_SERVER}/products/${id}/similar`);
    return data;
  }

  return useQuery(
    ["product", "similar", productId],
    () => fetchFn(productId),

    options
  );
}
