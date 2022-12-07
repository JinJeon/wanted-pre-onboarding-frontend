import React from "react";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { TodoDataType } from "@api/todo";
import * as S from "@components/ToDoItem/ToDoItem.style";
import theme from "@styles/theme";

type ToDoItemPropsType = Omit<TodoDataType, "id"> & {};

const ToDoItem = ({ todo, isCompleted, userId }: ToDoItemPropsType) => {
  const showEditMode = () => {
    console.log("showEditMode");
  };

  const deleteToDo = () => {
    console.log("showEditMode");
  };

  return (
    <S.Wrapper>
      <S.ToDoWrapper>{todo}</S.ToDoWrapper>
      <S.ButtonsWrapper>
        <FaRegEdit onClick={showEditMode} color={theme.colors.yellow} />
        <FaRegTrashAlt onClick={deleteToDo} color={theme.colors.red} />
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default React.memo(ToDoItem);
