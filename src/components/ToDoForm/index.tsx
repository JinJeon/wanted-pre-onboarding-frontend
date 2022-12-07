import { FormEvent } from "react";

import { FaPlus as AddIcon } from "react-icons/fa";

import { createTodo } from "@api/todo";
import * as S from "@components/ToDoForm/ToDoForm.style";
import { writeWhatToDo } from "@constants/sentences";
import useInput from "@hooks/useInput";

type ToDoFormPropsType = {
  onSubmitSuccess: () => void;
};

const toDoMaxLength = 50;

const ToDoForm = ({ onSubmitSuccess }: ToDoFormPropsType) => {
  const {
    inputValue: newToDo,
    setInputValue: setNewToDo,
    onChange: onChangeNewToDo,
  } = useInput("");

  const submitToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, isSuccess, errorMessage } = await createTodo({ todo: newToDo });
    if (isSuccess && data) {
      onSubmitSuccess();
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

export default ToDoForm;
