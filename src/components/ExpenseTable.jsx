import React from "react";
import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expense";

function ExpenseTable() {
  const expense = useRecoilValue(expensesState);

  return (
    <Table data-testid='expenseList' borderless hover responsive>
      <thead>
        <tr>
          <th>날짜</th>
          <th>내용</th>
          <th>금액</th>
          <th>결제자</th>
        </tr>
      </thead>
      <tbody>
        {expense.map((data, index) => (
          <tr key={index}>
            <td>{data.date}</td>
            <td>{data.desc}</td>
            <td>{data.amount} 원</td>
            <td>{data.payer}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExpenseTable;
