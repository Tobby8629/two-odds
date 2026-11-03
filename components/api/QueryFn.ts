import axios from "axios";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "./Axois";

export const getQuery = async <T>(
  url: string,
  params?: any
): Promise<T> => {
  try {
    const response = await getRequest(url, {
      params,
    });

    if (response.status === 200) {
      return response.data as T;
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error("Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios response data:", error.response?.data);
      console.error("Axios status:", error.response?.status);
    }

    throw error;
  }
};

export const postQuery = async (url: string, data: any) => {
  try {
    const response = await postRequest(url, data);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error("Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios response data:", error.response?.data);
      console.error("Axios status:", error.response?.status);
    } else {
      console.error("Unknown error:", error);
    }

    throw error;
  }
};

export const putQuery = async (url: string, data: any) => {
  try {
    const response = await putRequest(url, data);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error("Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios response data:", error.response?.data);
      console.error("Axios status:", error.response?.status);
    } else {
      console.error("Unknown error:", error);
    }

    throw error;
  }
};

export const patchQuery = async (url: string, data: any) => {
  try {
    const response = await patchRequest(url, data);

    if (response.status === 200 || response.status === 204) {
      return response.data;
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error("Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios response data:", error.response?.data);
      console.error("Axios status:", error.response?.status);
    } else {
      console.error("Unknown error:", error);
    }

    throw error;
  }
};

export const deleteQuery = async (url: string, data?: any) => {
  try {
    const response = await deleteRequest(url, { data });

    if (response.status === 200 || response.status === 204) {
      return response.data;
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error("Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios response data:", error.response?.data);
      console.error("Axios status:", error.response?.status);
    } else {
      console.error("Unknown error:", error);
    }

    throw error;
  }
};