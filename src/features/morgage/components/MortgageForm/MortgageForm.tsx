import { useState } from "react";

import "./MortgageForm.css";

import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Toggle from "../../../../components/Toggle/Toggle";

import type { FormData } from "../../types/morgage.types";

function MortgageForm() {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    rate: "",
    years: "",
    installments: "",
    rateType: "fixed",
  });

  return (
    <form>
      <div className="from__line-one">
        <Input
          id="amount"
          label={"Amount"}
          name="Amount"
          value={formData.amount}
          onChange={(value) => setFormData({ ...formData, amount: value })}
        />
        <Input
          id="rate"
          label={"Rate"}
          name="Rate"
          value={formData.rate}
          onChange={(value) => setFormData({ ...formData, rate: value })}
        />
      </div>
      <div className=" from__line-two">
        <Input
          id="years"
          label={"Years"}
          name="Years"
          value={formData.years}
          onChange={(value) => setFormData({ ...formData, years: value })}
        />
        <Input
          id="installments"
          label={"Installments"}
          name="Installments"
          value={formData.installments}
          onChange={(value) =>
            setFormData({ ...formData, installments: value })
          }
        />
      </div>
      <Toggle
        id="rateType"
        label={"Rate type: " + formData.rateType}
        checked={formData.rateType === "variable"}
        onChange={(value) =>
          setFormData({
            ...formData,
            rateType: value === true ? "variable" : "fixed",
          })
        }
      />
      <div className="form__button">
        <Button>Calculate</Button>
      </div>
    </form>
  );
}

export default MortgageForm;
