import { useState } from "react";
import "./App.css";
import MortgageHistory from "./features/mortgage/components/MortgageHistory/MortgageHistory";

import MortgageForm from "./features/mortgage/components/MortgageForm/MortgageForm";
import MortgageResult from "./features/mortgage/components/MortgageResult/MortgageResult";
import type { MortgageSimulation } from "./features/mortgage/types/mortgage.types";

function App() {
  const [result, setResult] = useState<MortgageSimulation>();
  return (
    <>
      <header>
        <h1 className="page__title">Mortgage Estimator</h1>
      </header>
      <main>
        <section className="mortgage__section-one">
          <MortgageForm liftResult={(res) => setResult(res)} />
          {result && <MortgageResult result={result} />}
        </section>
        <section>
          <MortgageHistory />
        </section>
      </main>
    </>
  );
}

export default App;
