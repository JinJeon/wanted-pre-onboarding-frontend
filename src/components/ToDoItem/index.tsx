import React from "react";
import { useState } from "react";

import { AiOutlineEdit as FinishEditIcon } from "react-icons/ai";
import { FaRegEdit as EditIcon, FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { FiDelete as QuitEditIcon } from "react-icons/fi";

import { deleteTodo, TodoDataType, updatesTodo } from "@api/todo";
import Loading from "@components/Loading";
import * as S from "@components/ToDoItem/ToDoItem.style";
import useInput from "@hooks/useInput";
import theme from "@styles/theme";

type ToDoItemPropsType = TodoDataType & {
  onDeleteSuccess: () => void;
  onErrorOccurs: (errorMessage: string) => void;
};

const ToDoItem = ({ todo, isCompleted, id, onDeleteSuccess, onErrorOccurs }: ToDoItemPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [prevToDo, setPrevToDo] = useState(todo);
  const { inputValue: newToDo, onChange: onChangeToDo, setInputValue: setNewToDo } = useInput(todo);
  const FirstButton = !isEdited ? EditIcon : FinishEditIcon;
  const SecondButton = !isEdited ? TrashIcon : QuitEditIcon;

  const showEditMode = () => {
    setPrevToDo(newToDo);
    setIsEdited(true);
  };

  const hideEditMode = () => {
    setNewToDo(prevToDo);
    setIsEdited(false);
  };

  const finishEdit = async () => {
    if (!newToDo.length) {
      hideEditMode();
      return;
    }

    const { isSuccess, data, errorMessage } = await updatesTodo({
      id,
      todo: newToDo,
      isCompleted: isChecked,
    });

    if (isSuccess && data) {
      setIsEdited(false);
    } else if (!isSuccess && errorMessage) {
      onErrorOccurs(errorMessage);
    }
  };

  const deleteThis = async () => {
    setIsLoading(true);
    const { isSuccess, errorMessage } = await deleteTodo({ id });
    if (isSuccess) {
      onDeleteSuccess();
    } else if (!isSuccess && errorMessage) {
      setIsLoading(false);
      onErrorOccurs(errorMessage);
    }
  };

  const handleCheckBox = async () => {
    const { isSuccess, data, errorMessage } = await updatesTodo({
      id,
      todo: newToDo,
      isCompleted: isChecked,
    });

    if (isSuccess && data) {
      setIsChecked(!isChecked);
    } else if (!isSuccess && errorMessage) {
      onErrorOccurs(errorMessage);
    }
  };

  return (
    <S.Wrapper isEdited={isEdited}>
      {isEdited ? (
        <S.Input
          value={newToDo}
          onChange={onChangeToDo}
          spellCheck={false}
          placeholder={prevToDo}
        />
      ) : (
        <S.ToDoTextWrapper>
          <S.CheckBox type='checkbox' checked={isChecked} onChange={handleCheckBox} />
          <S.ToDoText isCompleted={isChecked}>{newToDo}</S.ToDoText>
        </S.ToDoTextWrapper>
      )}

      <S.ButtonsWrapper>
        {isLoading ? (
          <Loading color='red' border={2} size={16} />
        ) : (
          <>
            <FirstButton
              onClick={!isEdited ? showEditMode : finishEdit}
              color={theme.colors.yellow}
            />
            <SecondButton
              onClick={!isEdited ? deleteThis : hideEditMode}
              color={theme.colors[isEdited ? "blue" : "red"]}
            />
          </>
        )}
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default React.memo(ToDoItem);
