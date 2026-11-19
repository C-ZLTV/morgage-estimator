import type { MortgageSimulation } from "../../types/mortgage.types";
import { formatInstallment } from "../../utils/functions";
import { RateTypeEnum } from "../../utils/variables";
import "./MortgageResult.css";

function MortgageResult({ result }: { result: MortgageSimulation }) {
  const { terms, installments } = result;

  return (
    <section className="result" aria-label="Mortgage calculation result">
      <section className="result__main">
        <h2 className="result__title">ESTIMATED MONTHLY INSTALLMENT</h2>
        <p className="result__value">
          {formatInstallment(installments[0].installment)}
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
                  <div className="result__detail">
                    <span className="result__detail-key">Rate: </span>
                    <span>{`${installment.rate}%`}</span>
                  </div>
                  <div className="result__detail">
                    <span className="result__detail-key">Payment: </span>
                    <span>{formatInstallment(installment.installment)}</span>
                  </div>
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
