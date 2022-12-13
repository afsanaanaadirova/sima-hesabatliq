import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import SubmitButton from "../../components/shared/button/submit-button";
import ModalComponent from "../../components/shared/modal/modal";
import { useDispatch } from "react-redux";
import { openModal } from "../../core/store/modal-slice";
import SuccessModal from "../../components/shared/success-modal/success-modal";
import {
  addUser,
  getallEnvironments,
  getallOrganization,
  getallMessage,
} from "../../core/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./add-customer.scss";

const Addcustomer = () => {
  const clientId = "XXXXX";
  const secretKey = "(31A454SF-H654-A5J8-AS85-JN54KJ545O6S)";
  const [error, setError] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    id: "",
    agency: "",
    service: "",
    environment: "",
    agencyNumber: "",
    url: "",
    clientId,
    secretKey,
  });
  const { agency, service, url, agencyNumber, environment } = inputs;

  const dispatch = useDispatch();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const response_agency = await getallOrganization();
    const response_environments = await getallEnvironments();
    const response_message = await getallMessage();
    console.log(response_agency.data);
    setAgencies(response_agency.data);
    setEnvironments(response_environments.data);
    setErrorMessage(response_message.data.error);
  };

  const onValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      agency &&
      environment &&
      service.trim() !== "" &&
      url.trim() !== "" &&
      agencyNumber.trim() !== ""
    ) {
      e.preventDefault();
      await addUser(inputs);
      dispatch(openModal());
    } else {
      setError(true);
    }
  };

  const history = useNavigate();
  const handlerRouterCustomer = () => {
    history("/credentials");
  };
  return (
    <div className="add__customer">
      <h5 className="add__title">Müştəri əlavə et</h5>
      <Form onSubmit={handleSubmit}>
        <div className="form__item">
          <FormGroup>
            <Label className="form__item--label">Qurum adı</Label>
            <Input
              className="form__item--input"
              name="agency"
              type="select"
              value={inputs.agency}
              onChange={(e) => onValueChange(e)}
              required
            >
              <option value="">Qurum adı</option>
              {agencies.map((item) => {
                return (
                  <option key={item.id} value={item.agency}>
                    {item.agency}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label className="form__item--label">Xidmət adı</Label>
            <Input
              className="form__item--input"
              name="service"
              placeholder="Xidmət adı"
              type="text"
              value={inputs.service}
              onChange={(e) => onValueChange(e)}
            />
            {error && inputs.service.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
        </div>
        <div className="form__item">
          <FormGroup>
            <Label className="form__item--label">Mühit</Label>
            <Input
              className="form__item--input"
              name="environment"
              type="select"
              value={inputs.environment}
              onChange={(e) => onValueChange(e)}
              required
            >
              <option value=""></option>
              {environments.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label className="form__item--label">URL</Label>
            <Input
              className="form__item--url"
              name="url"
              placeholder="with a placeholder"
              type="url"
              value={inputs.url}
              onChange={(e) => onValueChange(e)}
            />
            {error && inputs.url.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <Label className="form__item--label">Qurum ID</Label>
            <Input
              className="form__item--input no-spinner"
              name="agencyNumber"
              placeholder="qurum ID"
              type="number"
              value={inputs.agencyNumber}
              onChange={(e) => onValueChange(e)}
            />
            {error && inputs.agencyNumber.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
        </div>
        <SubmitButton>Davam et</SubmitButton>
        <SuccessModal
          handlerClose={handlerRouterCustomer}
          value={clientId}
          placeholder={secretKey}
        />
      </Form>
    </div>
  );
};

export default Addcustomer;
