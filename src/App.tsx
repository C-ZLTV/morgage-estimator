import { useState } from "react";
import Input from "./components/Input/Input";

import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const [formData, setFormData] = useState({
    amount: "",
    rate: "",
    years: "",
    installments: "",
    rateType: "fixed",
  });

  return (
    <>
      <header>
        <h1 className="page__title">Morgage Estimator</h1>
      </header>

      <main>
        <form>
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

          <Button>Calculate</Button>
        </form>
      </main>
    </>
  );
}

export default App;
