import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.js";
import CenteredOverLayForm from "./CenteredOverLayForm.jsx";

function CreateGroup() {
  const setGroupName = useSetRecoilState(groupNameState);
  const [validGroupName, setValidGroupName] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
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
    <CenteredOverLayForm
      title='먼저, 더치 페이 할 그룹의 이름을 정해볼까요?'
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Control
          type='text'
          required
          placeholder='그룹 이름'
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Form.Control.Feedback type='invalid' data-valid={validGroupName}>
          그룹 이름을 입력해주세요.
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverLayForm>
  );
}

export default CreateGroup;
