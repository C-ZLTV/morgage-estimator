import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MortgageResult from "./MortgageResult";
import { RateTypeEnum } from "../../utils/variables";
import type { MortgageSimulation } from "../../types/mortgage.types";

describe("MortgageResult", () => {
  const fixedResult: MortgageSimulation = {
    terms: {
      amount: 100000,
      rate: 2.5,
      years: 20,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
    },
    installments: [
      {
        id: "1",
        installment: 529.9,
        interest: 208.33,
        rate: 2.5,
      },
    ],
  };

  it("displays the estimated installment", () => {
    render(<MortgageResult result={fixedResult} />);

    expect(screen.getByText("Estimated installment")).toBeInTheDocument();
    expect(screen.getByText(/529/)).toBeInTheDocument();
  });

  it("does not display the next installments for a fixed rate", () => {
    render(<MortgageResult result={fixedResult} />);

    expect(
      screen.queryByText(/Estimate of the next 5 installments/i),
    ).not.toBeInTheDocument();
  });

  it("displays the next 5 installments for a variable rate", () => {
    const variableResult: MortgageSimulation = {
      ...fixedResult,
      terms: {
        ...fixedResult.terms,
        rateType: RateTypeEnum.VARIABLE,
      },
      installments: Array.from({ length: 6 }, (_, index) => ({
        id: String(index + 1),
        installment: 529.9 + index,
        interest: 208.33,
        rate: 2.5 + index * 0.1,
      })),
    };

    render(<MortgageResult result={variableResult} />);

    expect(
      screen.getByText(/Estimate of the next 5 installments/i),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(5);

    expect(
      screen.getByText(/rates are examples for illustrative purposes/i),
    ).toBeInTheDocument();
  });
});
