import { FormEvent } from "react";

import { FaPlus } from "react-icons/fa";

import { createTodo } from "@api/todo";
import * as S from "@components/ToDoForm/ToDoForm.style";
import useInput from "@hooks/useInput";

const ToDoForm = () => {
  const {
    inputValue: newToDo,
    // setInputValue: setNewToDo,
    onChange: onChangeNewToDo,
  } = useInput("");

  const submitToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, isSuccess, errorMessage } = await createTodo({ todo: newToDo });
  };

  return (
    <S.Wrapper onSubmit={submitToDo}>
      <S.Input value={newToDo} onChange={onChangeNewToDo} />
      <S.SubmitButton disabled={!newToDo.length}>
        <FaPlus size={12.5} />
      </S.SubmitButton>
    </S.Wrapper>
  );
};

export default ToDoForm;
