import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";

import {
  AUTHORIZATION,
  CONTENT_TYPE,
  APPLICATION_JSON,
  BEARER,
  ACCESS_TOKEN,
} from "@constants/words";
import { getLocalStorageInfo } from "@utils/localStorage";

import { unexpectedErrorOccurs } from "./../constants/sentences";

type UseFetchParamsType = {
  address: string;
  isContentType?: boolean;
  isAuth?: boolean;
};

type ErrorDataType = { message: string };

const serverApiAddress = "https://pre-onboarding-selection-task.shop";

export const useFetch = ({ address, isContentType, isAuth }: UseFetchParamsType) => {
  const baseURL = `${serverApiAddress}/${address}`;
  const headers: RawAxiosRequestHeaders = {};

  if (isContentType) {
    headers[CONTENT_TYPE] = APPLICATION_JSON;
  }
  if (isAuth) {
    const accessToken = getLocalStorageInfo({ key: ACCESS_TOKEN });
    headers[AUTHORIZATION] = `${BEARER} ${accessToken}`;
  }

  const client = axios.create({ baseURL, headers });

  return client;
};

export const checkError = (error: any) => {
  const { response } = error as AxiosError<ErrorDataType>;
  if (!response) {
    console.error(error);
    return unexpectedErrorOccurs;
  } else {
    return response.data.message;
  }
};
