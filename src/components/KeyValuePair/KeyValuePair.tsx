import "./KeyValuePair.css";

function KeyValuePair({ label, value }: { label: string; value: string }) {
  return (
    <div className="keyvalue__container">
      <span className="keyvalue__key">{label} </span>
      <span className="keyvalue__value">{value}</span>
    </div>
  );
}

export default KeyValuePair;
