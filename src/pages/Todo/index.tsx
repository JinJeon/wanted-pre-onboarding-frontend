import { useEffect, useState } from "react";

import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { getTodos, TodoDataType } from "@api/todo";
import ToDoForm from "@components/ToDoForm";
import ToDoItem from "@components/ToDoItem";
import { TODOLIST } from "@constants/words";
import * as S from "@pages/ToDo/ToDo.style";
import { pathName } from "@router";
import { removeLocalStorageInfo } from "@utils/localStorage";

const ToDo = () => {
  const [toDoData, setToDoData] = useState<TodoDataType[]>([]);
  const navigate = useNavigate();

  const getToDoData = async () => {
    const { data, isSuccess, errorMessage } = await getTodos();

    if (isSuccess && data) {
      setToDoData(data);
    } else if (!isSuccess && errorMessage) {
      // show that error occurs
    }
  };

  const logout = () => {
    removeLocalStorageInfo({ key: "access_token" });
    navigate(pathName.signin);
  };

  const toDoList = toDoData
    .map((info) => <ToDoItem key={info.id} onDeleteSuccess={getToDoData} {...info} />)
    .reverse();

  useEffect(() => {
    getToDoData();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.ButtonIcon />
        <S.Title>{TODOLIST}</S.Title>
        <S.ButtonIcon onClick={logout}>
          <LogoutIcon size={16} />
        </S.ButtonIcon>
      </S.Header>
      <ToDoForm onSubmitSuccess={getToDoData} />
      <S.ListWrapper>{toDoList}</S.ListWrapper>
    </S.Wrapper>
  );
};

export default ToDo;
