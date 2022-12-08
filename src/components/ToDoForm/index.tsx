import React, { FormEvent, useContext } from "react";

import { FaPlus as AddIcon } from "react-icons/fa";

import { createTodo } from "@api/todo";
import * as S from "@components/ToDoForm/ToDoForm.style";
import { writeWhatToDo } from "@constants/sentences";
import useInput from "@hooks/useInput";
import { TodoDispatchContext } from "@store/todo";

const toDoMaxLength = 50;

const ToDoForm = () => {
  const {
    inputValue: newToDo,
    setInputValue: setNewToDo,
    onChange: onChangeNewToDo,
  } = useInput("");
  const todoDataMapDispatch = useContext(TodoDispatchContext);

  const submitToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, isSuccess, errorMessage } = await createTodo({ todo: newToDo });
    if (isSuccess && data) {
      todoDataMapDispatch({ type: "CREATE", value: data });
      setNewToDo("");
    } else if (!isSuccess && errorMessage) {
      // show that error occurs
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
