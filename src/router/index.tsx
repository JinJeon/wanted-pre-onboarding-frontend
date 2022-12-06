import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import Todo from "@pages/Todo";

const pathName = {
  login: "/",
  todo: "todo",
  other: "/*",
};

export const routes = [
  { path: pathName.login, element: <Login /> },
  {
    element: <Login />,
    children: [{ path: pathName.todo, element: <Todo /> }],
  },
  { path: pathName.other, element: <NotFound /> },
];
