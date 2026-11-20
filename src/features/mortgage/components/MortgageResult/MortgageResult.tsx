import KeyValuePair from "../../../../components/KeyValuePair/KeyValuePair";
import type { MortgageSimulation } from "../../types/mortgage.types";
import { formatNumber, formatCurrency } from "../../utils/functions";
import { RateTypeEnum } from "../../utils/variables";
import "./MortgageResult.css";

function MortgageResult({ result }: { result: MortgageSimulation }) {
  const { terms, installments } = result;

  return (
    <section className="result" aria-label="Mortgage calculation result">
      <section className="result__main">
        <h2 className="result__title">Estimated installment</h2>
        <p className="result__value">
          {formatCurrency(installments[0].installment)}
        </p>
      </section>

      {terms.rateType === RateTypeEnum.VARIABLE && (
        <section className="result__list">
          <h3>Estimate of the next 5 installments*</h3>

          <ol className="result__installments">
            {installments.slice(0, 5).map((installment, index) => (
              <li className="result__installment" key={installment.id}>
                <div className="result__installment-title">
                  {`${index + 1}° Installment`}
                </div>
                <div className="result__details">
                  <KeyValuePair
                    label={"Rate: "}
                    value={`${formatNumber(installment.rate)}%`}
                  ></KeyValuePair>
                  <KeyValuePair
                    label={"Payment: "}
                    value={formatCurrency(installment.installment)}
                  ></KeyValuePair>
                </div>
              </li>
            ))}
          </ol>

          <p className="result__disclaimer">
            *The rates are examples for illustrative purposes only.
          </p>
        </section>
      )}
    </section>
  );
}

export default MortgageResult;
