import React from "react";
import "./package-box.scss";

const PackageBox = ({
  count,
  transaction,
  cost,
  edv,
  transaction_cost,
  signature_cost,
}) => {
  return (
    <>
      <div className="package__item">
        <div className="package__item--count">{count}</div>
        <div className="package__item--transaction">{transaction}</div>
        <div className="package__item--cost">{cost}</div>
        {signature_cost && (
          <div className="package__item--cost">
            {signature_cost}
            <span>1 tranzaksiyanın qiyməti</span>
          </div>
        )}
        <div className="package__item--edv">{edv}</div>
        {transaction_cost && (
          <div className="package__item--cost">
            {transaction_cost} <span>paket qiyməti</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PackageBox;
