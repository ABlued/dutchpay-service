import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.ts";
import CenteredOverLayForm from "./CenteredOverLayForm.tsx";
import styled from "styled-components";

function CreateGroup() {
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [validGroupName, setValidGroupName] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <CenteredOverLayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className='align-items-start'>
              <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className='align-items-center'>
              <Form.Group controlId='validationGroupName'>
                <Form.Control
                  type='text'
                  placeholder='그룹 이름'
                  required
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <Form.Control.Feedback
                  type='invalid'
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='align-items-end'>
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverLayForm>
  );
}

export default CreateGroup;

const StyledH2 = styled.h2`
  font-weight: 700;
  text-align: right;
  line-height: 35px;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({ type: "submit" })`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledRow = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 60vh;
`;
