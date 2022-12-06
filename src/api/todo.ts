import { apiAddress } from "@constants/api";
import { checkError, useFetch } from "@utils/api";

type TodoDataType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type UpdatesTodoParamsType = Omit<TodoDataType, "userId">;

const address = apiAddress.todo;

export const createTodo = async ({ todo }: { todo: string }) => {
  const client = useFetch({ address, isContentType: true, isAuth: true });

  try {
    const { data } = await client.post<TodoDataType>("", { todo });
    return data;
  } catch (error) {
    return checkError(error);
  }
};

export const getTodos = async () => {
  const client = useFetch({ address, isAuth: true });

  try {
    const { data } = await client.get<TodoDataType[]>("");
    return data;
  } catch (error) {
    return checkError(error);
  }
};

export const updatesTodo = async ({ id, todo, isCompleted }: UpdatesTodoParamsType) => {
  const client = useFetch({ address, isAuth: true, isContentType: true });

  try {
    const { data } = await client.put<TodoDataType>(`:${id}`, { todo, isCompleted });
    return data;
  } catch (error) {
    return checkError(error);
  }
};

export const deleteTodo = async ({ id }: { id: number }) => {
  const client = useFetch({ address, isAuth: true, isContentType: true });

  try {
    await client.delete(`:${id}`);
  } catch (error) {
    return checkError(error);
  }
};
