import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.js";

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
    <div>
      <h1>Dutch Pay</h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <Form.Group controlId='validationGroupName'>
              <Form.Control
                type='text'
                placeholder='그룹 이름'
                required
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Form.Control.Feedback type='invalid' data-valid={validGroupName}>
                그룹 이름을 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type='submit'>저장</Button>
          </Row>
        </Form>
      </Container>
      {/* <CenteredOverLayForm /> */}
    </div>
  );
}

export default CreateGroup;
