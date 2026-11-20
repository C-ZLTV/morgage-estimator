import KeyValuePair from "../../../../components/KeyValuePair/KeyValuePair";
import type { MortgageHistoryEntry } from "../../types/mortgage.types";
import { formatCurrency, formatNumber } from "../../utils/functions";
import "./MortgageHistory.css";

function MortgageHistory({ entries }: { entries: MortgageHistoryEntry[] }) {
  return (
    <>
      <h2>History</h2>
      {entries.length === 0 ? (
        <p>All your previous searches will appear here.</p>
      ) : (
        <ol className="history__installments">
          {entries.map((entry, index) => (
            <li className="history__installment" key={entry.id}>
              <div className="history__installment-title">
                {`${entries.length - index}° Search`}
              </div>
              <div className="history__details">
                <KeyValuePair
                  label={"Amount: "}
                  value={`${formatCurrency(entry.amount)}`}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Rate: "}
                  value={`${formatNumber(entry.rate)}%`}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Years: "}
                  value={`${entry.years}`}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Installments: "}
                  value={`${entry.installments}`}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Rate Type: "}
                  value={`${entry.rateType}`}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Payment : "}
                  value={formatCurrency(entry.installment)}
                ></KeyValuePair>
                <KeyValuePair
                  label={"Interest on Payment : "}
                  value={formatCurrency(entry.interest)}
                ></KeyValuePair>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export default MortgageHistory;
