import React from "react";
import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expense";

export const calculateMinimumTransaction = (
  expense,
  members,
  mountPerPerson
) => {
  const minimumTransaction = [];
  if (mountPerPerson === 0) return minimumTransaction;
  // 1. 사람별로 냈어야 할 금액
  const membersToPay = {};

  members.forEach((member) => {
    membersToPay[member] = mountPerPerson;
  });

  // 2. 사람별로 넣어야 할 금액 업데이트

  expense.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  // 3. 누가 누구에게 얼마를 보내야 하는지 계산

  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({
      member,
      amount: membersToPay[member],
    }))
    .sort((a, b) => a.amount - b.amount);

  let leftIndex = 0;
  let rightIndex = sortedMembersToPay.length - 1;

  while (leftIndex < rightIndex) {
    while (
      leftIndex < rightIndex &&
      sortedMembersToPay[leftIndex].amount === 0
    ) {
      leftIndex++;
    }
    while (
      leftIndex < rightIndex &&
      sortedMembersToPay[rightIndex].amount === 0
    ) {
      rightIndex--;
    }
    const toReceive = sortedMembersToPay[leftIndex];
    const toSend = sortedMembersToPay[rightIndex];

    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minimumTransaction.push({
        sender: toSend.member,
        receiver: toReceive.member,
        amount: amountToReceive,
      });

      toReceive.amount = 0;
      toSend.amount -= toReceive.amount;
      leftIndex++;
    } else {
      minimumTransaction.push({
        sender: toSend.member,
        receiver: toReceive.member,
        amount: amountToSend,
      });

      toReceive.amount += toSend.amount;
      toSend.amount = 0;
      rightIndex--;
    }
  }
  return minimumTransaction;
};

function SettlementSummary() {
  const expenses = useRecoilValue(expensesState);

  const totalExpenseAmount = parseFloat(
    expenses.reduce(
      (prevAmount, curExpense) => prevAmount + parseFloat(curExpense.amount),
      0
    )
  ).toFixed(2);
  const groupMembersCount = 0;
  const splitAmount = totalExpenseAmount / groupMembersCount;

  const minimumTransaction = calculateMinimumTransaction();

  return (
    <div>
      <h3>2. 정산은 이렇게!</h3>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <span>
            {groupMembersCount} 명이서 총 {totalExpenseAmount}원 지출
          </span>
          <br />
          <span>한 사람 당 {splitAmount}</span>

          <ul>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${receiver}`}>
                <span>
                  {sender} → {receiver} : {amount}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SettlementSummary;
