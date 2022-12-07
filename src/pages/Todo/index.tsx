import { useEffect, useState } from "react";

import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { getTodos, TodoDataType } from "@api/todo";
import useErrorMessage from "@components/ErroMessage";
import ToDoForm from "@components/ToDoForm";
import ToDoItem from "@components/ToDoItem";
import { TODOLIST } from "@constants/words";
import * as S from "@pages/ToDo/ToDo.style";
import { pathName } from "@router";
import { removeLocalStorageInfo } from "@utils/localStorage";

const ToDo = () => {
  const [toDoData, setToDoData] = useState<TodoDataType[]>([]);
  const navigate = useNavigate();
  const { setMessage, ErrorMessage } = useErrorMessage({});

  const getToDoData = async () => {
    const { data, isSuccess, errorMessage } = await getTodos();

    if (isSuccess && data) {
      setToDoData(data);
    } else if (!isSuccess && errorMessage) {
      setMessage(errorMessage);
    }
  };

  const showErrorMessage = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  const logout = () => {
    removeLocalStorageInfo({ key: "access_token" });
    navigate(pathName.signin);
  };

  const toDoList = toDoData
    .map((info) => (
      <ToDoItem
        key={info.id}
        onDeleteSuccess={getToDoData}
        onErrorOccurs={showErrorMessage}
        {...info}
      />
    ))
    .reverse();

  useEffect(() => {
    getToDoData();
  }, []);

  return (
    <S.Wrapper>
      <S.ErrorMessageWrapper>
        <ErrorMessage />
      </S.ErrorMessageWrapper>
      <S.ToDoWrapper>
        <S.Header>
          <S.ButtonIcon />
          <S.Title>{TODOLIST}</S.Title>
          <S.ButtonIcon onClick={logout}>
            <LogoutIcon size={16} />
          </S.ButtonIcon>
        </S.Header>
        <ToDoForm onSubmitSuccess={getToDoData} />
        <S.ListWrapper>{toDoList}</S.ListWrapper>
      </S.ToDoWrapper>
    </S.Wrapper>
  );
};

export default ToDo;
