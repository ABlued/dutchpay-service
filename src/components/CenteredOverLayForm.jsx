import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";

function CenteredOverLayForm(children) {
  return (
    <CentralizedContainer>
      <StyledHeader>Dutch Pay</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </CentralizedContainer>
  );
}

export default CenteredOverLayForm;

const CentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

const StyledHeader = styled.h1`
  font-weight: 700;
`;
