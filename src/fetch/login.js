import axios from "axios";
import { useMutation } from "react-query";
import { API_SERVER } from "../utils/constants";
import { useQuery } from "react-query";
import { callApi } from "../utils/utils";

export function useLogin(options = {}) {
  async function mutationFn(data) {
    const reponse = await axios.post(`${API_SERVER}/login`, data);
    return reponse;
  }
  return useMutation(mutationFn, options);
}

export function useRegister(options = {}) {
  async function mutationFn(data) {
    const reponse = await axios.post(`${API_SERVER}/register`, data);
    return reponse;
  }
  return useMutation(mutationFn, options);
}

export function useGetCurrentUser(options = {}) {
  async function fetchFn() {
    const { data } = await callApi(`${API_SERVER}/currentUser`);
    return data;
  }

  return useQuery(["current", "user"], fetchFn, options);
}

export function useRestPassword(options = {}) {
  async function mutationFn(data) {
    const reponse = await axios.post(`${API_SERVER}/reset_password`, data);
    return reponse;
  }
  return useMutation(mutationFn, options);
}
