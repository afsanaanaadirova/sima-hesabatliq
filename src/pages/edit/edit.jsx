import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import {
  editUser,
  getallOrganization,
  getallCredentials,
  getallEnvironments,
  getallMessage,
} from "../../core/api/index";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../components/shared/button/submit-button";
import { useDispatch } from "react-redux";
import { openModal } from "../../core/store/modal-slice";
import SuccessModal from "../../components/shared/success-modal/success-modal";

const EditUser = () => {
  const clinetId = "XXXXX";
  const secretKey = "(31A454SF-H654-A5J8-AS85-JN54KJ545O6S)";
  const [agencies, setAgencies] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    id: "",
    agency: "",
    service: "",
    environment: "",
    agencyNumber: "",
    url: "",
    clinetId,
    secretKey,
  });
  const { agency, service, url, agencyNumber, environment } = user;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const response = await getallCredentials(id);
    setUser(response.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const response_agency = await getallOrganization();
    const response_environments = await getallEnvironments();
    const response_message = await getallMessage();
    setAgencies(response_agency.data);
    setEnvironments(response_environments.data);
    setErrorMessage(response_message.data.error);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const history = useNavigate();
  const hanslerEditRouter = () => {
    history("/credentials");
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
      await editUser(id, user);
      dispatch(openModal());
    } else {
      setError(true);
    }
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
              value={agency}
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
              value={service}
              onChange={(e) => onValueChange(e)}
            />
            {error && user.service.length <= 0 ? (
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
              value={environment}
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
              value={url}
              onChange={(e) => onValueChange(e)}
            />
            {error && user.url.length <= 0 ? (
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
              className="form__item--input"
              name="agencyNumber"
              placeholder="qurum ID"
              type="number"
              value={agencyNumber}
              onChange={(e) => onValueChange(e)}
            />
            {error && user.agencyNumber.length <= 0 ? (
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
          handlerClose={hanslerEditRouter}
          value={clinetId}
          placeholder={secretKey}
        />
      </Form>
    </div>
  );
};

export default EditUser;
