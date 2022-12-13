import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import SubmitButton from "../../shared/button/submit-button";
import { addUserPerson, getTokens, getallMessage } from "../../../core/api";
import { useDispatch } from "react-redux";
import { openModal } from "../../../core/store/modal-slice";
import Subtract from "../../../assets/images/common/Subtract.png";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [userToken, setUserToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [noSameErrMessage, setNoSameErrMessage] = useState("");
  const [noSame, setNoSame] = useState(false);
  const [error, setError] = useState(false);

  const [inputs, setInputs] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = inputs;
  const navigate = useNavigate();
  let jwtEmail = JSON.parse(localStorage.getItem("email"));
  useEffect(() => {
    getAllDataToken();
    getErrorData();
  }, []);

  const getAllDataToken = async () => {
    const token = await getTokens();
    setUserToken(token.data);
  };

  const getErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.noSpace);
    setNoSameErrMessage(response_message.data.noSame);
  };

  const onValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      e.preventDefault();
      await addUserPerson(inputs);
      dispatch(openModal());
    }
    userToken.map(
      (x) =>
        jwt_decode(x.token).email == email &&
        jwt_decode(x.token).password == password
          ? (localStorage.setItem(
              "dataKey",
              JSON.stringify(jwt_decode(x.token).username)
            ),
            localStorage.setItem(
              "email",
              JSON.stringify(jwt_decode(x.token).email)
            ),
            navigate("/report"))
          : setError(true),
      setNoSame(true)
    );
  };

  return (
    <div>
      <div className="container__blue">
        <img src={Subtract} />
      </div>
      <div className="login">
        <Form onSubmit={handleSubmit}>
          <h3 className="login__title">Daxil ol </h3>
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
              value={password}
              name="password"
              placeholder="şifrə"
              type="password"
              onChange={onValueChange}
            />
            {error && inputs.password.length <= 0 ? (
              <FormFeedback className="form__item--error">
                {errorMessage}
              </FormFeedback>
            ) : noSame && jwtEmail != inputs.email ? (
              <FormFeedback className="form__item--error">
                {noSameErrMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
          <SubmitButton className="loginBtn">Daxil ol</SubmitButton>
          <div className="login__goRegister">
            <span>
              Hesabınız yoxdur?{" "}
              <NavLink to={"/register"}> Qeydiyyatdan keçin</NavLink>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
