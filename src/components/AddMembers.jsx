import React, { useState } from "react";
import CenteredOverLayForm from "./CenteredOverLayForm.jsx";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMember.js";
import { groupNameState } from "../state/groupName.js";
import { styled } from "styled-components";

function AddMembers() {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
  };

  const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`;

  return (
    <CenteredOverLayForm
      title={header}
      handleSubmit={handleSubmit}
      validated={validated}
    >
      <InputTags
        data-testid='input-member-names'
        placeholder='띄어쓰기'
        onTags={(value) => {
          setGroupMembers(value.values);
        }}
      />
      {validated && groupMembers.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해 주세요.
        </StyledErrorMessage>
      )}
    </CenteredOverLayForm>
  );
}

export default AddMembers;

const StyledErrorMessage = styled.span`
  color: red;
`;
