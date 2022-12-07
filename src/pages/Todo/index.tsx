import { useEffect, useState } from "react";

import { getTodos, TodoDataType } from "@api/todo";
import ToDoForm from "@components/ToDoForm";
import ToDoItem from "@components/ToDoItem";
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

  const toDoList = toDoData
    .map((info) => <ToDoItem key={info.id} onDeleteSuccess={getToDoData} {...info} />)
    .reverse();

  useEffect(() => {
    getToDoData();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>TO DO LIST</S.Title>
      <ToDoForm onSubmitSuccess={getToDoData} />
      <S.ListWrapper>{toDoList}</S.ListWrapper>
    </S.Wrapper>
  );
};

export default ToDo;
