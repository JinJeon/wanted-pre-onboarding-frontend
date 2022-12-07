import { useEffect, useState } from "react";

import { getTodos, TodoDataType } from "@api/todo";
import ToDoForm from "@components/ToDoForm";
import * as S from "@pages/ToDo/ToDo.style";

const ToDo = () => {
  const [toDoData, setToDoData] = useState<TodoDataType[]>([]);

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
      <ToDoForm />
    </S.Wrapper>
  );
};

export default ToDo;
