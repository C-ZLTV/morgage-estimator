import "./App.css";
import MorgageHistory from "./features/morgage/components/MorgageHistory/MorgageHistory";

import MortgageForm from "./features/morgage/components/MortgageForm/MortgageForm";
import MortgageResult from "./features/morgage/components/MortgageResult/MortgageResult";

function App() {
  return (
    <>
      <header>
        <h1 className="page__title">Morgage Estimator</h1>
      </header>
      <main className="morgage__main">
        <MortgageForm />
        <MortgageResult />
        <MorgageHistory />
      </main>
    </>
  );
}

export default App;
