import React from "react";
import { useState } from "react";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { deleteTodo, TodoDataType } from "@api/todo";
import Loading from "@components/Loading";
import * as S from "@components/ToDoItem/ToDoItem.style";
import theme from "@styles/theme";

type ToDoItemPropsType = TodoDataType & {
  onDeleteSuccess: () => void;
};

const ToDoItem = ({ todo, isCompleted, userId, id, onDeleteSuccess }: ToDoItemPropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const showEditMode = () => {
    console.log("showEditMode");
  };

  const deleteThis = async () => {
    setIsLoading(true);
    const { isSuccess, errorMessage } = await deleteTodo({ id });
    if (isSuccess) {
      onDeleteSuccess();
    } else if (!isSuccess && errorMessage) {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.ToDoWrapper isCompleted={isCompleted}>{todo}</S.ToDoWrapper>
      <S.ButtonsWrapper>
        {isLoading ? (
          <Loading color='red' border={2} size={16} />
        ) : (
          <>
            <FaRegEdit onClick={showEditMode} color={theme.colors.yellow} />
            <FaRegTrashAlt onClick={deleteThis} color={theme.colors.red} />
          </>
        )}
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default React.memo(ToDoItem);
