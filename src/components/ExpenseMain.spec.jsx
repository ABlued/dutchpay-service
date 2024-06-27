import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import ExpenseMain from "./ExpenseMain";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <ExpenseMain />
    </RecoilRoot>
  );

  const dataInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByPlaceholderText(/누가 입력/i);
  const addButton = screen.getByText(/추가하기/i);

  return {
    dataInput,
    descInput,
    amountInput,
    payerInput,
    addButton,
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
      const { addButton } = renderComponent();
      await userEvent.click(addButton);
      const errorMessage = screen.getByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      expect(errorMessage).toBeInTheDocument();

      const payerErrorMessage =
        screen.getByText("결제자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).toBeInTheDocument();

      const amountErrorMessage =
        screen.getByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).toBeInTheDocument();
    });
    test('비용 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭 시, 비용이 추가된다', async () => {
      const { dataInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();
      await userEvent.type(dataInput, "2021-09-01");
      await userEvent.type(descInput, "편의점에서 간식 구입");
      await userEvent.type(amountInput, "10000");
      await userEvent.selectOptions(payerInput, "철수");

      userEvent.click(addButton);

      const errorMessage = screen.queryByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      expect(errorMessage).not.toBeInTheDocument();

      const payerErrorMessage =
        screen.queryByText("결제자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).not.toBeInTheDocument();

      const amountErrorMessage =
        screen.queryByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).not.toBeInTheDocument();
    });
  });
});
