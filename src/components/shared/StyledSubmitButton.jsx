import { Button } from "react-bootstrap";
import { styled } from "styled-components";

export const StyledSubmitButton = styled(Button).attrs({ type: "submit" })`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
