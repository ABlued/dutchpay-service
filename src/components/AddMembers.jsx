import React from "react";
import CenteredOverLayForm from "./CenteredOverLayForm";
import { Button, Container, Form, Row } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

function AddMembers() {
  const handleSubmit = () => {};

  return (
    <CenteredOverLayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          {/* <StyledRow> */}
          <Row className='align-items-start'>
            <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <InputTags placeholder='띄어쓰기' onTags={() => {}} />
          </Row>
          <Row className='align-items-center'></Row>
          <Row className='align-items-end'>
            s<Button>저장</Button>
          </Row>
          {/* </StyledRow> */}
        </Form>
      </Container>
    </CenteredOverLayForm>
  );
}

export default AddMembers;
