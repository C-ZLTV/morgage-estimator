import "./MortgageResult.css";

function MortgageResult({ result }: { result: string }) {
  return (
    <>
      <div className="estamate">
        <div className="estimate__title">ESTIMATED MONTHLY INSTALLMENT</div>
        <div className="estimate__value">{`€ ${result}`}</div>
      </div>
    </>
  );
}

export default MortgageResult;
