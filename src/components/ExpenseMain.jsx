import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { AddExpenseForm } from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import { groupNameState } from "../state/groupName";
import SettlementSummary from "./SettlementSummary";
import { StyledLogo } from "./shared/ServiceLogo";
function ExpenseMain() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
}

export default ExpenseMain;

const LeftPane = () => (
  <Container>
    <Row>
      <StyledLogo />
    </Row>
    <Row>
      <AddExpenseForm /> 
    </Row>
    <Row>
      <SettlementSummary />
    </Row>
  </Container>
);

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 100px 31px 100px 31px;
`;

const StyledGroupName = styled(Container)`
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;
