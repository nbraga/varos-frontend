import axios from "axios";
import {
  deleteCookie,
  getCookie as getClientCookie,
} from "cookies-next/client";
import { getCookie as getServerCookie } from "cookies-next/server";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    let token: string | undefined;

    if (typeof window === "undefined") {
      try {
        token = await getServerCookie("@varos.token");
      } catch (serverError) {
        console.warn("Erro ao buscar cookie no servidor:", serverError);
      }
    } else {
      try {
        token = getClientCookie("@varos.token");
      } catch (clientError) {
        console.warn("Erro ao buscar cookie no cliente:", clientError);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("Erro geral ao configurar autenticação:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        deleteCookie("@varos.token");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export const createServerActionApi = (token?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};
