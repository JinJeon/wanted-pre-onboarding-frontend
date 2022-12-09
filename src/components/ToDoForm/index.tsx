import React, { FormEvent, useContext } from "react";

import { FaPlus as AddIcon } from "react-icons/fa";

import { createTodo } from "@api/todo";
import * as S from "@components/ToDoForm/ToDoForm.style";
import { needOneWord, writeWhatToDo } from "@constants/sentences";
import useInput from "@hooks/useInput";
import { SetErrorMessageContext } from "@store/errorMessage";
import { TodoDispatchContext } from "@store/todo";

const toDoMaxLength = 50;

const ToDoForm = () => {
  const {
    inputValue: newToDo,
    setInputValue: setNewToDo,
    onChange: onChangeNewToDo,
  } = useInput("");
  const todoDataMapDispatch = useContext(TodoDispatchContext);
  const setErrorMessage = useContext(SetErrorMessageContext);

  const submitToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newToDo.length) {
      setErrorMessage(needOneWord);
      return;
    }

    const { data, isSuccess, errorMessage } = await createTodo({ todo: newToDo });
    if (isSuccess && data) {
      todoDataMapDispatch({ type: "CREATE", value: data });
      setNewToDo("");
    } else if (!isSuccess && errorMessage) {
      setErrorMessage(errorMessage);
    }
  };

  return (
    <S.Wrapper onSubmit={submitToDo}>
      <S.Input
        placeholder={writeWhatToDo}
        value={newToDo}
        onChange={onChangeNewToDo}
        spellCheck={false}
        maxLength={toDoMaxLength}
      />
      <S.SubmitButton disabled={!newToDo.length}>
        <AddIcon size={12.5} />
      </S.SubmitButton>
    </S.Wrapper>
  );
};

export default React.memo(ToDoForm);
