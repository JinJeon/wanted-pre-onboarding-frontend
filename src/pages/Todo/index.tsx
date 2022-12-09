import { useContext, useEffect } from "react";

import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { getTodos } from "@api/todo";
import ErrorMessage from "@components/ErroMessage";
import ToDoForm from "@components/ToDoForm";
import ToDoItem from "@components/ToDoItem";
import { TODOLIST } from "@constants/words";
import * as S from "@pages/Todo/TodoChange.style";
import { pathName } from "@router";
import { SetErrorMessageContext } from "@store/errorMessage";
import { TodoContext, TodoDispatchContext } from "@store/todo";
import { removeLocalStorageInfo } from "@utils/localStorage";

const Todo = () => {
  const toDoDataMap = useContext(TodoContext);
  const dispatchTodoDataMap = useContext(TodoDispatchContext);
  const toDoData = [...toDoDataMap.values()];
  const navigate = useNavigate();
  const setErrorMessage = useContext(SetErrorMessageContext);

  const getToDoData = async () => {
    const { data, isSuccess, errorMessage } = await getTodos();

    if (isSuccess && data) {
      dispatchTodoDataMap({ type: "GET", value: data });
    } else if (!isSuccess && errorMessage) {
      setErrorMessage(errorMessage);
    }
  };

  const logout = () => {
    removeLocalStorageInfo({ key: "access_token" });
    navigate(pathName.signin);
  };

  const toDoList = toDoData.map((info) => <ToDoItem key={info.id} {...info} />).reverse();

  useEffect(() => {
    getToDoData();
  }, []);

  return (
    <S.Wrapper>
      <S.ErrorMessageWrapper>
        <ErrorMessage disapperTime={2000} />
      </S.ErrorMessageWrapper>
      <S.ToDoWrapper>
        <S.Header>
          <S.ButtonIcon />
          <S.Title>{TODOLIST}</S.Title>
          <S.ButtonIcon onClick={logout}>
            <LogoutIcon size={16} />
          </S.ButtonIcon>
        </S.Header>
        <ToDoForm />
        <S.ListWrapper>{toDoList}</S.ListWrapper>
      </S.ToDoWrapper>
    </S.Wrapper>
  );
};

export default Todo;
