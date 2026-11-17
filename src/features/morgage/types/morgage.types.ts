type RateType = "fixed" | "variable";

interface FormData {
  amount: string;
  rate: string;
  years: string;
  installments: string;
  rateType: RateType;
}

export type { FormData };
