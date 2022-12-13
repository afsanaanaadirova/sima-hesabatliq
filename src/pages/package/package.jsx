import React,{useState,useEffect}from "react";
import PackageBox from "./components/package-box";
import {  getallPackages, getallSignatureBoxs,getallSignature } from "../../core/api";
import "./package.scss";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [signatureBoxs, setSignatureBoxs] = useState([]);
  const [signature, setSignature] = useState([]);

  useEffect(() => {
    getAllPackageData();
  }, []);

  const getAllPackageData = async () => {
    const response_signature = await getallSignature();
    const response_packages = await getallPackages();
    const response_signatureBoxs = await getallSignatureBoxs();
    setPackages(response_packages.data);
    setSignatureBoxs(response_signatureBoxs.data);
    setSignature(response_signature.data)
  };

  return (
    <>
      <div className="packages">
        <div className="packages__title--main">
          <h4>Qiymətlər və kampaniyalar</h4>
        </div>
        <div className="packages__title--items">
          <h4>Avtorizasiya</h4>
          <div className="packages__items ">
            {packages.map((item) => (
              <PackageBox
                key={item.id}
                count={item.count}
                transaction={item.transaction}
                cost={item.cost}
                edv={item.edv}
              />
            ))}
          </div>
        </div>
        <div className="packages__title--items">
          <h4>İmzalanma</h4>
          <div className="packages__items packages__items--signature">
            {signature.map((item) => (
              <PackageBox
                key={item.id}
                count={item.count}
                transaction={item.transaction}
                cost={item.cost}
                edv={item.edv}
              />
            ))}
          </div>
        </div>
        <div className="packages__title--items">
          <h4>İmzalanma(1 illik paketlər)</h4>
          <div className="packages__items packages__items--signatures">
            {signatureBoxs.map((item) => (
              <PackageBox
                key={item.id}
                count={item.count}
                transaction={item.transaction}
                signature_cost={item.signature_cost}
                transaction_cost={item.transaction_cost}
              />
            ))}
          </div>
          <h3 className="packages__title--info">
            Qiymətlərə ƏDV <span>daxil deyil.</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Package;
