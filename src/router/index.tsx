import NotFound from "@pages/NotFound";
import SignIn from "@pages/Sign";
import Todo from "@pages/Todo";
import { TodoProvider } from "@store/todo";

import ProtectedRoute from "./ProtectedRoute";

export const pathName = {
  signin: "/",
  todo: "todo",
  other: "/*",
};

export const routes = [
  { path: pathName.signin, element: <SignIn /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: pathName.todo,
        element: (
          <TodoProvider>
            <Todo />
          </TodoProvider>
        ),
      },
    ],
  },
  { path: pathName.other, element: <NotFound /> },
];
