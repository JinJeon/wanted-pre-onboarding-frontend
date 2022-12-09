import React, { useContext } from "react";
import { useState } from "react";

import { AiOutlineEdit as FinishEditIcon } from "react-icons/ai";
import { FaRegEdit as EditIcon, FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { FiDelete as QuitEditIcon } from "react-icons/fi";

import { deleteTodo, TodoDataType, updatesTodo } from "@api/todo";
import Loading from "@components/Loading";
import * as S from "@components/ToDoItem/ToDoItem.style";
import { needOneWord } from "@constants/sentences";
import useInput from "@hooks/useInput";
import { SetErrorMessageContext } from "@store/errorMessage";
import { TodoDispatchContext } from "@store/todo";
import theme from "@styles/theme";

type ToDoItemPropsType = TodoDataType;

const ToDoItem = ({ todo, isCompleted, id, userId }: ToDoItemPropsType) => {
  const todoDataMapDispatch = useContext(TodoDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [prevToDo, setPrevToDo] = useState(todo);
  const setErrorMessage = useContext(SetErrorMessageContext);
  const { inputValue: newToDo, onChange: onChangeToDo, setInputValue: setNewToDo } = useInput(todo);
  const FirstButton = !isEdited ? EditIcon : FinishEditIcon;
  const SecondButton = !isEdited ? TrashIcon : QuitEditIcon;
  const itemInfo = { id, todo, isCompleted, userId };

  const showEditMode = () => {
    setPrevToDo(newToDo);
    setIsEdited(true);
  };

  const hideEditMode = () => {
    setNewToDo(prevToDo);
    setIsEdited(false);
  };

  const changeItemInfo = async (type: "checkbox" | "editor") => {
    const { isSuccess, data, errorMessage } = await updatesTodo({
      id,
      todo: newToDo,
      isCompleted: type === "checkbox" ? !isChecked : isChecked,
    });

    if (isSuccess && data) {
      todoDataMapDispatch({ type: "UPDATE", value: itemInfo });
      type === "editor" && setIsEdited(false);
      type === "checkbox" && setIsChecked(!isChecked);
    } else if (!isSuccess && errorMessage) {
      setErrorMessage(errorMessage);
    }
  };

  const finishEditItem = () => {
    if (!newToDo.length) {
      setErrorMessage(needOneWord);
    } else {
      changeItemInfo("editor");
    }
  };

  const deleteItem = async () => {
    setIsLoading(true);
    const { isSuccess, errorMessage } = await deleteTodo({ id });
    if (isSuccess) {
      todoDataMapDispatch({ type: "DELETE", value: itemInfo });
    } else if (!isSuccess && errorMessage) {
      setIsLoading(false);
      setErrorMessage(errorMessage);
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
          <S.CheckBox
            type='checkbox'
            checked={isChecked}
            onChange={() => changeItemInfo("checkbox")}
          />
          <S.ToDoText isCompleted={isChecked}>{newToDo}</S.ToDoText>
        </S.ToDoTextWrapper>
      )}

      <S.ButtonsWrapper>
        {isLoading ? (
          <Loading color='red' border={2} size={16} />
        ) : (
          <>
            <FirstButton
              onClick={!isEdited ? showEditMode : finishEditItem}
              color={theme.colors.yellow}
            />
            <SecondButton
              onClick={!isEdited ? deleteItem : hideEditMode}
              color={theme.colors[isEdited ? "blue" : "red"]}
            />
          </>
        )}
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default React.memo(ToDoItem);
