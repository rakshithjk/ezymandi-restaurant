import { API_TOKEN } from "./constants";
import axios from "axios";

export const getAccessToken = () => localStorage.getItem(API_TOKEN);

export const callApi = async (endpoint) => {
  /** Headers */
  const headers = { pragma: "no-cache", "cache-control": "no-cache" };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = axios.get(endpoint, { headers: headers });

  return response;
};
