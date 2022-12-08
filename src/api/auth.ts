import { apiAddress } from "@constants/api";
import { ACCESS_TOKEN } from "@constants/words";
import { useFetch } from "@utils/api";
import { checkError } from "@utils/api";
import { getLocalStorageInfo, setLocalStorageInfo } from "@utils/localStorage";

export type SignOptionType = keyof typeof apiAddress["auth"];

type SingParamsType = {
  signOption: SignOptionType;
  email: string;
  password: string;
};

type SignSuccessDataType = { [ACCESS_TOKEN]: string };

type FetchResultType<T> = {
  isSuccess: boolean;
  data?: T;
  errorMessage?: string;
};

export const sign = async ({ email, password, signOption }: SingParamsType) => {
  const address = apiAddress.auth[signOption];
  const client = useFetch({ address, isContentType: true });
  const result: FetchResultType<SignSuccessDataType> = { isSuccess: false };

  try {
    const { data } = await client.post<SignSuccessDataType>("", { email, password });
    const accessToken = data["access_token"];
    setLocalStorageInfo({ key: "access_token", info: accessToken });
    result.data = data;
    result.isSuccess = true;
  } catch (error) {
    result.errorMessage = checkError(error);
  }

  return result;
};

export const checkIsLogin = () => {
  const accessToken = getLocalStorageInfo({ key: "access_token" });
  // 토큰을 통한 추가적인 확인을 위한 api 요청 필요
  const result = !!accessToken;
  return result;
};
