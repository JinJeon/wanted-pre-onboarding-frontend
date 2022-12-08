import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";

import { unexpectedErrorOccurs } from "@constants/sentences";
import { AUTHORIZATION, CONTENT_TYPE, APPLICATION_JSON, BEARER } from "@constants/words";
import { getIsString } from "@utils/getIsString";
import { getLocalStorageInfo } from "@utils/localStorage";

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
    const accessToken = getLocalStorageInfo<string>(getIsString)({ key: "access_token" });
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
