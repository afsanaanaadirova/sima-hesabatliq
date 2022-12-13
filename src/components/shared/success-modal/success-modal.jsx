import React from 'react'
import Success from "../../../assets/images/common//success.svg"
import { Form, FormGroup, Label, Input } from "reactstrap";
import ModalComponent from '../modal/modal';

const SuccessModal = ({handlerClose,placeholder,value,setOrganization}) => {
  return (
    <ModalComponent handlerClose={handlerClose}>
    <div className="modal__body">
      <img src={Success} alt="success" />
      <span>Uğurlu əməliyyat</span>
    </div>
    <Form className="modal__form">
      <FormGroup>
        <Label for="exampleSelect1">{value =="XXXXX"? "Client ID":"Qurum adı *"}</Label>
        <Input
          className="modal__form--input"
          id="exampleSelect1"
          name="text"
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={e => setOrganization(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
      <Label for="exampleSelect1">{value =="XXXXX"? "Secret key":"VÖEN"}</Label>
        <Input
          onChange={e => setOrganization(e.target.value)}
          className="modal__form--input"
          name="text"
          placeholder={placeholder}
          type="text"
        />
      </FormGroup>
    </Form>
  </ModalComponent>
  )
}

export default SuccessModal;
