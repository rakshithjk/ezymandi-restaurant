import axios from "axios";
import { useMutation } from "react-query";
import { API_SERVER } from "../utils/constants";
import { useQuery } from "react-query";

export function useLogin(options = {}) {
  async function mutationFn(data) {
    console.log("data", data);
    const reponse = await axios.post(`${API_SERVER}/login`, data);
    return reponse;
  }
  return useMutation(mutationFn, options);
}

export function useRegister(options = {}) {
  async function mutationFn() {
    const reponse = await axios.post(`${API_SERVER}/register`);
    return reponse;
  }
  return useMutation(mutationFn, options);
}

export function useGetCurrentUser(options = {}) {
  async function fetchFn() {
    const { data } = await axios.get(`${API_SERVER}/currentUser`);
    return data;
  }

  return useQuery(["current", "user"], fetchFn, options);
}
