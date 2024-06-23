import React, { useState } from "react";
import CenteredOverLayForm from "./CenteredOverLayForm.jsx";
import { Button, Container, Form, Row } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMember.js";
import { groupNameState } from "../state/groupName.js";

function AddMembers() {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilState(groupNameState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <CenteredOverLayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          {/* <StyledRow> */}
          <Row className='align-items-start'>
            <h2>그룹에 속한 사람들의 이름을 모두 적어 주세요.</h2>
          </Row>
          <Row>
            <InputTags
              data-testid='input-member-names'
              placeholder='띄어쓰기'
              onTags={(value) => {
                setGroupMembers(value.values);
              }}
            />
            {formSubmitted && groupMembers.length === 0 && (
              <span>그룹 멤버들의 이름을 입력해 주세요.</span>
            )}
          </Row>
          <Row className='align-items-center'></Row>
          <Row className='align-items-end'>
            <Button type='submit'>저장</Button>
          </Row>
          {/* </StyledRow> */}
        </Form>
      </Container>
    </CenteredOverLayForm>
  );
}

export default AddMembers;
