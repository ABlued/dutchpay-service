import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
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
  const [amount, setAmount] = useState();
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
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type='date'
                placeholder='결제한 날짜를 선택해 주세요'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type='text'
                isInvalid={!isDescValid && validated}
                isValid={isDescValid}
                placeholder='비용에 대한 설명을 입력해 주세요'
                value={desc}
                onChange={({ target }) => setDesc(target.value)}
              />
              <Form.Control.Feedback type='invalid' data-valid={isDescValid}>
                비용 내용을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type='number'
                step='0.01'
                placeholder='비용은 얼마였나요?'
                min='0'
                value={amount}
                isInvalid={!isAmountValid && validated}
                isValid={isAmountValid}
                onChange={({ target }) => setAmount(target.value)}
              />
              <Form.Control.Feedback data-valid={isAmountValid} type='invalid'>
                1원 이상의 금액을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                isValid={isPayerValid}
                isInvalid={!isPayerValid && validated}
                defaultValue=''
                className='form-control'
                onChange={({ target }) => setPayer(target.value)}
              >
                <option disabled value=''>
                  누가 결제 했나요?
                </option>
                <option>철수</option>
                {members &&
                  members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback data-valid={isPayerValid} type='invalid'>
                결제자를 선택해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='d-grid gap-2'>
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 40px;
  background-color: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;

  input,
  select {
    background: #59359a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    color: #f8f9fa;
    height: 40px;

    &:focus {
      color: #f8f9fa;
      background: #59359a;
      filter: brightness(80%);
    }

    ::placeholder {
      color: #f8f9fa;
    }
  }
`;
export const StyledTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
  @media screen and (max-width: 600px) {
    font-size: 5.5vw;
    line-height: 6vw;
  }
`;
const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  height: 45px;
  border: 0px;
  border-radius: 8px;
  background-color: #e2d9f3;
  color: #59359a;
  margin-top: 10px;

  &:hover,
  &:focus {
    background-color: #e2d9f3;
    filter: rgba(0, 0, 0, 0.3);
  }
`;
