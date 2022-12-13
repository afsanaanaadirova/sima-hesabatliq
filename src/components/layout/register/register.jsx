import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Alert, FormFeedback } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import SubmitButton from "../../shared/button/submit-button";
import { addUserPerson, getTokens, getallMessage } from "../../../core/api";
import Subtract from "../../../assets/images/common/Subtract.png";
import jwt_decode from "jwt-decode";
import "./register.scss";
import "../../../assets/styles/index.scss"
import PasswordChecklist from "react-password-checklist"

const Register = (isValid) => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [passError, setPassError] = useState(false);
  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = inputs;
  const onValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const history = useNavigate();

  useEffect(() => {
    getErrorData();
  }, []);

  const getErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.noSpace);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      let userExists = await checkUser(email);
      if (!userExists && passValid===true) {
        e.preventDefault();
        await addUserPerson(inputs);
        setSuccessAlert(true);
        setDangerAlert(false);
        setTimeout(() => {
          history("/login");
        }, 3000);
      // } else if(passValid === false){
      //      return true;
      //  }else if(!userExists){
      //   return false;
      //  }else {
      }
      else if(passValid===false){
        setPassError(true);
        setSuccessAlert(false);
      }else{
        setError(true);
        setPassError(false);
        setDangerAlert(true);
        setSuccessAlert(false);
        // setPassValid(false);
        setTimeout(() => {
          setDangerAlert(false);
        }, 3000);
      }
    }
    setError(true);
  };

 
  const checkUser = async (email) => {
    let tokens = (await getTokens()).data;
    let emails = tokens.map((item) => jwt_decode(item.token).email);
    if (emails.includes(email)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="container__blue">
        <img src={Subtract} />
      </div>
      <div className="register">
        <Form onSubmit={handleSubmit}>
          <h3 className="login__title">Qeydiyyatdan keç </h3>
          <FormGroup>
            <Label for="exampleEmail">Ad,Soyad</Label>
            <Input
              value={username}
              name="username"
              placeholder="ad,soyad"
              type="text"
              onChange={onValueChange}
            />
            {error && inputs.username.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">E-mail</Label>
            <Input
              value={email}
              name="email"
              placeholder="e-mail"
              type="email"
              onChange={onValueChange}
            />
            {error && inputs.email.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Şifrə</Label>
            <Input
              value={inputs.password}
              name="password"
              placeholder="şifrə"
              type="password"
              onChange={onValueChange}
            />
            <PasswordChecklist className="pt-20"
				    rules={["minLength","specialChar","number","capital"]}
				    minLength={8}
				    value={inputs.password}
				    onChange={(isValid)=>{if(isValid)setPassValid(true)}}
            messages={{
              minLength: "Minimum 8 simvol daxil edin",
              specialChar: "Minimum 1 xüsusi simvol daxil edin",
              number: "Minimum 1 rəqəm daxil edin",
              capital: "Minimum 1 böyük hərf daxil edin"
            }}
			      />
            {error && inputs.password.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : ""
            }
          </FormGroup>
          <SubmitButton>Qeydiyyatdan Keç</SubmitButton>
          {successAlert == true ? (
            <Alert color="success" className="alert-item">
              Qeydiyyat uğurla tamamlandı!
              <br /> Giriş səhifəsinə yönləndirilirsiniz!
            </Alert>
          ) : dangerAlert == true ? (
            <Alert color="danger" className="alert-item">
              Bu email artıq mövcuddur!
            </Alert>
          ) : passError == true ? (
            <Alert color="danger" className="alert-item">
              Şifrə düzgün deyil!
            </Alert>
          ) : ""}
          <div className="register__goLogin">
            <span>
              Hesabınız var? <NavLink to={"/login"}> Daxil olun</NavLink>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
