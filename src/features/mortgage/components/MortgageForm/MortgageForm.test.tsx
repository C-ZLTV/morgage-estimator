import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MortgageForm from "./MortgageForm";
import { RateTypeEnum } from "../../utils/variables";

describe("MortgageForm", () => {
  it("renders the form with a disabled submit button", () => {
    render(<MortgageForm liftResult={vi.fn()} />);

    expect(screen.getByRole("button", { name: /calculate/i })).toBeDisabled();
  });

  it("enables the submit button when all fields are valid", async () => {
    const user = userEvent.setup();

    render(<MortgageForm liftResult={vi.fn()} />);

    await user.type(screen.getByLabelText("Amount"), "100000");
    await user.type(screen.getByLabelText("Rate percentage"), "2,5");
    await user.type(screen.getByLabelText("Years"), "20");
    await user.type(screen.getByLabelText("Yearly installments"), "12");

    expect(screen.getByRole("button", { name: /calculate/i })).toBeEnabled();
  });

  it("calculates the mortgage and calls liftResult on submit", async () => {
    const user = userEvent.setup();
    const liftResult = vi.fn();

    render(<MortgageForm liftResult={liftResult} />);

    await user.type(screen.getByLabelText("Amount"), "100000");
    await user.type(screen.getByLabelText("Rate percentage"), "2,5");
    await user.type(screen.getByLabelText("Years"), "20");
    await user.type(screen.getByLabelText("Yearly installments"), "12");

    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(liftResult).toHaveBeenCalledTimes(1);

    expect(liftResult).toHaveBeenCalledWith(
      expect.objectContaining({
        terms: expect.objectContaining({
          amount: 100000,
          rate: 2.5,
          years: 20,
          installments: 12,
          rateType: RateTypeEnum.FIXED,
        }),
      }),
    );
  });
});
