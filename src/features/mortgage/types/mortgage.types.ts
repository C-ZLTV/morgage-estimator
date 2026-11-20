import { RateTypeEnum } from "../utils/variables";

type RateType = (typeof RateTypeEnum)[keyof typeof RateTypeEnum];

interface FormData {
  amount: string;
  rate: string;
  years: string;
  installments: string;
  rateType: RateType;
}

interface MortgageTerms {
  amount: number;
  rate: number;
  years: number;
  installments: number;
  rateType: RateType;
}

interface Installment {
  id: string;
  installment: number;
  interest: number;
  rate: number;
}

interface MortgageSimulation {
  terms: MortgageTerms;
  installments: Installment[];
}

interface MortgageHistoryEntry extends MortgageTerms, Installment {
  createdAt: string;
}

interface MortgageHistory {
  installmentsHistory: MortgageHistoryEntry[];
}

export type {
  FormData,
  MortgageTerms,
  MortgageSimulation,
  MortgageHistoryEntry,
  MortgageHistory,
};
