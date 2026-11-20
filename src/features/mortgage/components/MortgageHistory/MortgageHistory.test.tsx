import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MortgageHistory from "./MortgageHistory";
import type { MortgageHistoryEntry } from "../../types/mortgage.types";
import { RateTypeEnum } from "../../utils/variables";

describe("MortgageHistory", () => {
  const entries: MortgageHistoryEntry[] = [
    {
      id: "1",
      createdAt: "2026-11-20T12:00:00.000Z",
      amount: 100000,
      rate: 2.5,
      years: 20,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
      installment: 529.9,
      interest: 208.33,
    },
    {
      id: "2",
      createdAt: "2026-11-20T13:00:00.000Z",
      amount: 150000,
      rate: 3,
      years: 25,
      installments: 12,
      rateType: RateTypeEnum.VARIABLE,
      installment: 711.5,
      interest: 375,
    },
  ];

  it("displays a message when the history is empty", () => {
    render(<MortgageHistory entries={[]} />);

    expect(
      screen.getByRole("heading", { name: "History" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/all your previous searches will appear here/i),
    ).toBeInTheDocument();
  });

  it("displays the details of a history entry", () => {
    render(<MortgageHistory entries={[entries[0]]} />);

    expect(screen.getByText("1° Search")).toBeInTheDocument();
    expect(screen.getByText("100000")).toBeInTheDocument();
    expect(screen.getByText("2.5%")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("fixed")).toBeInTheDocument();
  });

  it("displays multiple history entries in the correct order", () => {
    render(<MortgageHistory entries={entries} />);

    expect(screen.getByText("1° Search")).toBeInTheDocument();
    expect(screen.getByText("2° Search")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
