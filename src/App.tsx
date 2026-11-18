import { useState } from "react";
import "./App.css";
import MorgageHistory from "./features/morgage/components/MorgageHistory/MorgageHistory";

import MortgageForm from "./features/morgage/components/MortgageForm/MortgageForm";
import MortgageResult from "./features/morgage/components/MortgageResult/MortgageResult";

function App() {
  const [result, setResult] = useState<string>("");
  return (
    <>
      <header>
        <h1 className="page__title">Morgage Estimator</h1>
      </header>
      <main>
        <section className="morgage__section-one">
          <MortgageForm onSubmit={(res) => setResult(res)} />
          {result && <MortgageResult result={result} />}
        </section>
        <section>
          <MorgageHistory />
        </section>
      </main>
    </>
  );
}

export default App;
