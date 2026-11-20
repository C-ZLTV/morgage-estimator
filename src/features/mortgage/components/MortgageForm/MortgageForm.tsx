import { useState } from "react";

import "./MortgageForm.css";

import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Toggle from "../../../../components/Toggle/Toggle";

import type { FormData, MortgageSimulation } from "../../types/mortgage.types";
import { cleanFieldValue, RateTypeEnum } from "../../utils/variables";
import { calculateMortgage, updateHistory } from "../../utils/functions";

function MortgageForm({
  liftResult,
}: {
  liftResult: (res: MortgageSimulation) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    amount: cleanFieldValue,
    rate: cleanFieldValue,
    years: cleanFieldValue,
    installments: cleanFieldValue,
    rateType: RateTypeEnum.FIXED,
  });

  const inputRegex = /^[\d,]*$/;

  //TODO - improve validation
  function getInputError(value: string) {
    if (inputRegex.test(value)) {
      return null;
    } else {
      return "Please use numbers and commas only. Example: 100000 2,5 30 12";
    }
  }

  const hasError = [
    formData.amount,
    formData.rate,
    formData.years,
    formData.installments,
  ].some((value) => value.trim() === "" || getInputError(value) !== null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const terms = {
      amount: Number(formData.amount),
      rate: parseFloat(formData.rate.replace(/,/g, ".")),
      years: Number(formData.years),
      installments: Number(formData.installments),
      rateType: formData.rateType,
    };

    const result = calculateMortgage(terms);
    liftResult(result);

    const newEntry = {
      createdAt: new Date().toISOString(),
      ...terms,
      ...result.installments[0],
    };

    updateHistory(newEntry);
  }

  function handleSubmitDisabled() {
    return Object.values(formData).includes(cleanFieldValue) || hasError;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form__line-one">
        <Input
          id="amount"
          label={"Amount"}
          name="amount"
          value={formData.amount}
          error={getInputError(formData.amount)}
          onChange={(value) => setFormData({ ...formData, amount: value })}
        />
        <Input
          id="rate"
          label={"Rate percentage"}
          name="rate"
          value={formData.rate}
          error={getInputError(formData.rate)}
          onChange={(value) => setFormData({ ...formData, rate: value })}
        />
      </div>
      <div className="form__line-two">
        <Input
          id="years"
          label={"Years"}
          name="years"
          value={formData.years}
          error={getInputError(formData.years)}
          onChange={(value) => setFormData({ ...formData, years: value })}
        />
        <Input
          id="installments"
          label={"Yearly installments"}
          name="installments"
          value={formData.installments}
          error={getInputError(formData.installments)}
          onChange={(value) =>
            setFormData({ ...formData, installments: value })
          }
        />
      </div>
      <Toggle
        id="rateType"
        label={"Rate type: " + formData.rateType}
        checked={formData.rateType === RateTypeEnum.VARIABLE}
        onChange={(value) =>
          setFormData({
            ...formData,
            rateType:
              value === true ? RateTypeEnum.VARIABLE : RateTypeEnum.FIXED,
          })
        }
      />
      <div className="form__button">
        <Button type="submit" disabled={handleSubmitDisabled()}>
          Calculate
        </Button>
      </div>
    </form>
  );
}

export default MortgageForm;
