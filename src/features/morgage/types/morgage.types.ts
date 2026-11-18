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

export type { FormData, MortgageTerms };
