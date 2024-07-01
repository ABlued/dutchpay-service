import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { groupMembersState } from "../state/groupMember";
import ExpenseMain from "./ExpenseMain";

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMembersState, ["철수", "영희"]);
      }}
    >
      <ExpenseMain />
    </RecoilRoot>
  );

  const dataInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);
  const addButton = screen.getByText("추가하기");
  const descErrorMessage = screen.getByText(
    "비용 내용을 입력해 주셔야 합니다."
  );
  const payerErrorMessage = screen.getByText("결제자를 선택해 주셔야 합니다.");

  const amountErrorMessage = screen.queryByText(
    "1원 이상의 금액을 입력해 주셔야 합니다."
  );
  return {
    dataInput,
    descInput,
    amountInput,
    payerInput,
    addButton,
    descErrorMessage,
    payerErrorMessage,
    amountErrorMessage,
  };
};
describe("비용 정산 메인 페이지", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용 추가 컴포넌트 렌더링", () => {
      const { dataInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();
      expect(dataInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test('비용 추가에 필수적인 입력 값을 채우지 않고 "추가" 버튼 클릭 시, 에러 메시지를 노출한다', async () => {
      const {
        addButton,
        amountErrorMessage,
        payerErrorMessage,
        descErrorMessage,
      } = renderComponent();
      await userEvent.click(addButton);

      expect(descErrorMessage).toHaveAttribute("data-valid", "false");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "false");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "false");
    });
    test('비용 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭 시, 비용이 추가된다', async () => {
      const {
        dataInput,
        descInput,
        amountInput,
        payerInput,
        addButton,
        amountErrorMessage,
        payerErrorMessage,
        descErrorMessage,
      } = renderComponent();
      await userEvent.type(dataInput, "2021-09-01");
      await userEvent.type(descInput, "편의점에서 간식 구입");
      await userEvent.type(amountInput, "10000");
      await userEvent.selectOptions(payerInput, "철수");

      userEvent.click(addButton);

      expect(descErrorMessage).toHaveAttribute("data-valid", "true");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "true");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "true");
    });
  });

  describe("비용 리스트 컴포넌트", () => {
    test("비용 리스트 컴포넌트 렌더링 되는가?", () => {
      renderComponent();
      const expenseListComponent = screen.getByTestId("expenseList");
      expect(expenseListComponent).toBeInTheDocument();
    });
  });
  describe("새로운 비용이 입력 되었을 때", () => {
    const addNewExpense = async () => {
      const { dataInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();
      await userEvent.type(dataInput, "2021-09-01");
      await userEvent.type(descInput, "편의점에서 간식 구입");
      await userEvent.type(amountInput, "10000");
      await userEvent.selectOptions(payerInput, "철수");

      userEvent.click(addButton);
    };
    test("날짜, 내용, 결제자, 급여 데이터가 정산 리스트에 추가 된다.", async () => {
      await addNewExpense();
      const expenseListComponent = screen.getByTestId("expenseList");
      const dateValue = within(expenseListComponent).getByText("2021-09-01");
      expect(dateValue).toBeInTheDocument();

      const descValue =
        within(expenseListComponent).getByText("편의점에서 간식 구입");
      expect(descValue).toBeInTheDocument();

      const amountValue = within(expenseListComponent).getByText(/10000/i);
      expect(amountValue).toBeInTheDocument();

      const payerValue = within(expenseListComponent).getByText("철수");
      expect(payerValue).toBeInTheDocument();
    });
  });
});
