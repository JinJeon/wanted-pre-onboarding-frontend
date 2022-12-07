import { apiAddress } from "@constants/api";
import { checkError, useFetch } from "@utils/api";

export type TodoDataType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type UpdatesTodoParamsType = Omit<TodoDataType, "userId">;

type FetchResultType<T> = {
  isSuccess: boolean;
  data?: T;
  errorMessage?: string;
};

const address = apiAddress.todo;

export const createTodo = async ({ todo }: { todo: string }) => {
  const client = useFetch({ address, isContentType: true, isAuth: true });
  const result: FetchResultType<TodoDataType> = { isSuccess: false };

  try {
    const { data } = await client.post<TodoDataType>("", { todo });
    result.isSuccess = true;
    result.data = data;
  } catch (error) {
    result.errorMessage = checkError(error);
  }

  return result;
};

export const getTodos = async () => {
  const client = useFetch({ address, isAuth: true });
  const result: FetchResultType<TodoDataType[]> = { isSuccess: false };

  try {
    const { data } = await client.get<TodoDataType[]>("");
    result.isSuccess = true;
    result.data = data;
  } catch (error) {
    result.errorMessage = checkError(error);
  }

  return result;
};

export const updatesTodo = async ({ id, todo, isCompleted }: UpdatesTodoParamsType) => {
  const client = useFetch({ address, isAuth: true, isContentType: true });
  const result: FetchResultType<TodoDataType> = { isSuccess: false };

  try {
    const { data } = await client.put<TodoDataType>(`${id}`, { todo, isCompleted });
    result.isSuccess = true;
    result.data = data;
  } catch (error) {
    result.errorMessage = checkError(error);
  }

  return result;
};

export const deleteTodo = async ({ id }: { id: number }) => {
  const client = useFetch({ address, isAuth: true, isContentType: true });
  const result: FetchResultType<null> = { isSuccess: false };

  try {
    const { status } = await client.delete(`${id}`);
    if (status === 204) result.isSuccess = true;
  } catch (error) {
    result.errorMessage = checkError(error);
  }

  return result;
};
