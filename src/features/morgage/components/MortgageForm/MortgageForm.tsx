import { useState } from "react";

import "./MortgageForm.css";

import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Toggle from "../../../../components/Toggle/Toggle";

import type { FormData } from "../../types/morgage.types";
import { cleanFieldValue, RateTypeEnum } from "../../utils/variables";
import { calculateMorgage } from "../../utils/functions";

function MortgageForm({ onSubmit }: { onSubmit: (res: string) => void }) {
  const [formData, setFormData] = useState<FormData>({
    amount: cleanFieldValue,
    rate: cleanFieldValue,
    years: cleanFieldValue,
    installments: cleanFieldValue,
    rateType: RateTypeEnum.FIXED,
  });

  const inputRegex = /^[\d,]*$/;

  //TODO - improve validation
  function hadleInputError(value: string) {
    if (inputRegex.test(value)) {
      return null;
    } else {
      return "Please use numbers and commas only. Example: 100000 2,5 30 12";
    }
  }

  function handleSubmit() {
    const terms = {
      amount: Number(formData.amount),
      rate: parseFloat(formData.rate.replace(/,/g, ".")),
      years: Number(formData.years),
      installments: Number(formData.installments),
      rateType: RateTypeEnum.FIXED,
    };
    const result = calculateMorgage(terms);
    onSubmit(result);
  }

  function handleSubmitDisabled() {
    return Object.values(formData).includes(cleanFieldValue);
  }

  /*   useEffect(() => {
    console.log("formData", formData);

    console.log("regex", inputRegex.test(formData.amount));
  }, [formData]);
 */
  return (
    <form>
      <div className="from__line-one">
        <Input
          id="amount"
          label={"Amount"}
          name="Amount"
          value={formData.amount}
          error={hadleInputError(formData.amount)}
          onChange={(value) => setFormData({ ...formData, amount: value })}
        />
        <Input
          id="rate"
          label={"Rate"}
          name="Rate"
          value={formData.rate}
          error={hadleInputError(formData.rate)}
          onChange={(value) => setFormData({ ...formData, rate: value })}
        />
      </div>
      <div className=" from__line-two">
        <Input
          id="years"
          label={"Years"}
          name="Years"
          value={formData.years}
          error={hadleInputError(formData.years)}
          onChange={(value) => setFormData({ ...formData, years: value })}
        />
        <Input
          id="installments"
          label={"Installments"}
          name="Installments"
          value={formData.installments}
          error={hadleInputError(formData.installments)}
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
        <Button disabled={handleSubmitDisabled()} onClick={handleSubmit}>
          Calculate
        </Button>
      </div>
    </form>
  );
}

export default MortgageForm;
