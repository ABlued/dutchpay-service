import React from "react";
import { AddExpenseForm } from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";

function ExpenseMain() {
  return (
    <div>
      <h1>ExpenseMain</h1>
      <AddExpenseForm />
      <ExpenseTable />
      <div></div>
    </div>
  );
}

export default ExpenseMain;
