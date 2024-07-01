import React from "react";
import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { expensesState } from "../state/expense";
import { OverlayWrapper } from "./shared/OverlayWrapper";

function ExpenseTable() {
  const expense = useRecoilValue(expensesState);

  return (
    <OverlayWrapper minHeight={"73vh"}>
      <Table data-testid='expenseList' borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
            <th></th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expense.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.desc}</td>
              <td>{data.amount} 원</td>
              <td>{data.payer}</td>
            </tr>
          ))}
        </StyledBody>
      </Table>
    </OverlayWrapper>
  );
}

export default ExpenseTable;

const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;

  th {
    padding: 15px 8px;
    min-width: 60px;
  }
  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 10px;
    th {
      padding: 10px 4px;
    }
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 20px;
    line-height: 50px;
    text-align: center;

    @media screen and (max-width: 600px) {
      font-size: 4vw;
      line-height: 20px;
    }
  }
`;
