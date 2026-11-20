import { describe, it, expect, beforeEach } from "vitest";
import { calculateMortgage, getHistory, updateHistory } from "./functions";
import { RateTypeEnum } from "./variables";

describe("calculateMortgage", () => {
  it("calculates the installment correctly with a fixed rate", () => {
    const result = calculateMortgage({
      amount: 100000,
      rate: 2.5,
      years: 20,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
    });

    expect(result.installments[0].installment).toBe(529.9);
  });

  it("calculates the installment correctly with a zero rate", () => {
    const result = calculateMortgage({
      amount: 12000,
      rate: 0,
      years: 1,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
    });

    expect(result.installments[0].installment).toBe(1000);
  });

  it("generates the correct number of installments", () => {
    const result = calculateMortgage({
      amount: 100000,
      rate: 2.5,
      years: 20,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
    });

    expect(result.installments).toHaveLength(240);
  });
});

describe("Mortgage history", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and retrieves a history entry", () => {
    const entry = {
      id: "test-1",
      createdAt: "2026-11-20T12:00:00.000Z",
      amount: 100000,
      rate: 2.5,
      years: 20,
      installments: 12,
      rateType: RateTypeEnum.FIXED,
      installment: 529.9,
      interest: 208.33,
    };

    const saved = updateHistory(entry);

    expect(saved).toBe(true);
    expect(getHistory().installmentsHistory).toEqual([entry]);
  });
});
