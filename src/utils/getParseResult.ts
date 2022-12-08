type ParseResult<T> =
  | { parsedValue: T; isSuccess: true }
  | { parsedValue?: undefined; isSuccess: false };

export type ParseGuardType = (typeTarget: any) => boolean;

export const getParseResult =
  <T>(guard: ParseGuardType) =>
  (value: string): ParseResult<T> => {
    const parsedValue = JSON.parse(value);
    return guard(parsedValue) ? { parsedValue, isSuccess: true } : { isSuccess: false };
  };
