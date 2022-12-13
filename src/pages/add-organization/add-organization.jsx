import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import SubmitButton from "../../components/shared/button/submit-button";
import { useDispatch } from "react-redux";
import { openModal } from "../../core/store/modal-slice";
import { addOrganization, getallMessage } from "../../core/api";
import { useNavigate } from "react-router-dom";
import "./add-organization.scss";
import SuccessModal from "../../components/shared/success-modal/success-modal";

const AddOrganization = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [organization, setOrganization] = useState({
    id: "",
    agency: "",
    agency_voen: "",
  });
  const { agency, agency_voen } = organization;

  useEffect(() => {
    getAllErrorData();
  }, []);

  const getAllErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.error);
  };

  const dispatch = useDispatch();

  const onValueChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agency.trim() !== "" && agency_voen.trim() !== "") {
      e.preventDefault();
      await addOrganization(organization);
      dispatch(openModal());
    } else {
      setError(true);
    }
  };

  const history = useNavigate();
  const organizationHandler = () => {
    history("/organization");
  };
  return (
    <>
      <div className="add__organization">
        <h5 className="add__organization--title">Qurum əlavə et</h5>
        <Form onSubmit={handleSubmit}>
          <div className="form__item">
            <FormGroup>
              <Label className="form__item--label">
                Qurum adı*
                <span>Bu xananın doldurulması mütləqdir</span>
              </Label>
              <Input
                className="form__item--input"
                name="agency"
                type="text"
                placeholder="Qurum adı"
                value={organization.agency}
                onChange={(e) => onValueChange(e)}
              />
              {error && organization.agency.length <= 0 ? (
                <FormFeedback className="form__item--error">
                  {errorMessage}
                </FormFeedback>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <Label className="form__item--label">VÖEN</Label>
              <Input
                className="form__item--input no-spinner"
                name="agency_voen"
                placeholder="VÖEN"
                type="number"
                value={organization.agency_voen}
                onChange={(e) => onValueChange(e)}
              />
              {error && organization.agency_voen.length <= 0 ? (
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
            handlerClose={organizationHandler}
            setOrganization={setOrganization}
            value={agency}
            placeholder={agency_voen}
          />
        </Form>
      </div>
    </>
  );
};

export default AddOrganization;
