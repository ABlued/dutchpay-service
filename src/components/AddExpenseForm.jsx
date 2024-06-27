import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { expensesState } from "../state/expense";
import { groupMembersState } from "../state/groupMember";

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState);
  const setExpense = useSetRecoilState(expensesState);
  const [validated, setValidated] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-")
  );
  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);

  const checkFormValidate = () => {
    const descValid = desc.length > 0;
    const payerValid = payer !== null;
    const amountValid = amount > 0;

    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && payerValid && amountValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkFormValidate()) {
      const newExpenses = {
        date,
        desc,
        amount,
        payer,
      };
      setExpense((oldExpenses) => [...oldExpenses, newExpenses]);
    }
    setValidated(true);
  };

  return (
    <div>
      <h1>form</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <h1>1. 비용 추가하기</h1>
        <Form.Group>
          <Form.Control
            type='date'
            placeholder='결제한 날짜를 선택해 주세요.'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='비용에 대한 설명을 입력해 주세요.'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            isValid={isDescValid}
            isInvalid={!isDescValid && validated}
          />
          <Form.Control.Feedback type='invalid' data-valid={isDescValid}>
            비용 내용을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='number'
            placeholder='비용은 얼마였나요?'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            isValid={isAmountValid}
            isInvalid={!isAmountValid && validated}
          />
          <Form.Control.Feedback type='invalid' data-valid={isAmountValid}>
            1원 이상의 금액을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Select
            type='text'
            defaultValue=''
            onChange={({ target }) => setPayer(target.value)}
            isValid={isPayerValid}
            isInvalid={!isPayerValid && validated}
          >
            <option disabled value=''>
              누가 결제 했나요?
            </option>
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid' data-valid={isPayerValid}>
            결제자를 선택해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>추가하기</Button>
      </Form>
    </div>
  );
};
