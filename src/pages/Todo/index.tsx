import { FormEvent, useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

import { createTodo, getTodos, TodoDataType } from "@api/todo";
import useInput from "@hooks/useInput";
import * as S from "@pages/ToDo/ToDo.style";

const ToDo = () => {
  const {
    inputValue: newToDo,
    // setInputValue: setNewToDo,
    onChange: onChangeNewToDo,
  } = useInput("");
  const [toDoData, setToDoData] = useState<TodoDataType[]>([]);

  const submitToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, isSuccess, errorMessage } = await createTodo({ todo: newToDo });
  };

  const getToDoData = async () => {
    const { data, isSuccess, errorMessage } = await getTodos();

    if (isSuccess && data) {
      setToDoData(data);
    } else if (!isSuccess && errorMessage) {
      // show that error occurs
    }
  };

  // const toDoList = toDoData.map(({ id, todo, isCompleted, userId }) => {});
  console.log(toDoData);

  useEffect(() => {
    getToDoData();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>TO DO LIST</S.Title>
      <S.ToDoForm onSubmit={submitToDo}>
        <S.Input value={newToDo} onChange={onChangeNewToDo} />
        <S.SubmitButton disabled={!newToDo.length}>
          <FaPlus size={12.5} />
        </S.SubmitButton>
      </S.ToDoForm>
    </S.Wrapper>
  );
};

export default ToDo;
