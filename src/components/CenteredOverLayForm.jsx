import React from "react";
import { Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper.jsx";
import { StyledH2 } from "./shared/StyledH2.jsx";
import { StyledRow } from "./shared/StyledRow.jsx";
import { StyledSubmitButton } from "./shared/StyledSubmitButton.jsx";
import { StyledLogo } from "./shared/ServiceLogo.jsx";

function CenteredOverLayForm({ title, children, handleSubmit, validated }) {
  return (
    <StyledCentralizedContainer>
      <StyledLogo />
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledRow>
              <Row className='align-items-start'>
                <StyledH2>{title}</StyledH2>
              </Row>
              <Row className='align-items-center'>{children}</Row>
              <Row className='align-items-end'>
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Row>
            </StyledRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
}

export default CenteredOverLayForm;

const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;
