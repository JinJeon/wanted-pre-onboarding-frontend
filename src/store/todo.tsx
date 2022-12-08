import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { TodoDataType } from "@api/todo";

type TodoDataMapType = Map<number, TodoDataType>;

type ToDoReducerActionType =
  | { type: "CREATE"; value: TodoDataType }
  | { type: "GET"; value: TodoDataType[] }
  | { type: "UPDATE"; value: TodoDataType }
  | { type: "DELETE"; value: TodoDataType };

type todoDispatchType = Dispatch<ToDoReducerActionType>;

const defaultToDo: TodoDataMapType = new Map();

export const TodoContext = createContext<TodoDataMapType>(defaultToDo);
export const TodoDispatchContext = createContext<todoDispatchType>(() => null);

const toDoReducer = (todoDataMap: TodoDataMapType, action: ToDoReducerActionType) => {
  const { type, value } = action;
  const newToDoDataMap = new Map(todoDataMap);

  switch (type) {
    case "GET":
      value.forEach((info) => {
        newToDoDataMap.set(info.id, info);
      });
      return newToDoDataMap;
    case "CREATE":
    case "UPDATE":
      newToDoDataMap.set(value.id, value);
      return newToDoDataMap;

    case "DELETE":
      newToDoDataMap.delete(value.id);
      return newToDoDataMap;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todo, dispatchTodo] = useReducer(toDoReducer, defaultToDo);

  return (
    <TodoContext.Provider value={todo}>
      <TodoDispatchContext.Provider value={dispatchTodo}>{children}</TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
};
