import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Input, Label, FormGroup, Form, Button, FormFeedback } from "reactstrap";
import { getallMessage } from "../../../../core/api";

export default function TableFilterDetail({
  handleFilter,
  setFilters,
  filters,
  resetFilter,
  filterType
  ,
  setError,
  error
}) {
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  dayjs.extend(isSameOrAfter);

  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getErrorData();
  }, [error]);

  const getErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.wrongDate);
  };

  const handleInput = (field) => (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleBtn = (e) => {
    e.preventDefault()

    console.log(filters);
    console.log(dayjs(filters.to).isSameOrAfter(filters.from));
    if (filters.to !== "" && filters.from !=="" && !dayjs(filters.to).isSameOrAfter(filters.from)) {
      setError(true)
      console.log(errorMessage);
    }
    

    else {
      setError(false)
      handleFilter();
    }
  };

  return (
    <div className="table-filter-detail">
      <Form className="filter-form" onSubmit={(e) => handleBtn(e)}>
        <div>
          <FormGroup>
            <Label for="exampleEmail">Tarixdən</Label>
            <Input
              value={filters.from}
              id="exampleEmail"
              name="email"
              placeholder="with a placeholder"
              type="date"
              onChange={handleInput("from")}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Tarixə</Label>
            <Input
              value={filters.to}
              id="examplePassword"
              name="password"
              placeholder="password placeholder"
              type="date"
              onChange={handleInput("to")}
              className={error ? "input-error" : ""}
            />
            {error ? (

              <FormFeedback className="form-error">
                {errorMessage}
              </FormFeedback>
            ) : (
              ""
            )}
          </FormGroup>
        </div>
        <div>
          {filterType === "certificate" ?
            <FormGroup>
              <Label for="exampleSelect">Tarix Növü</Label>
              <Input
                value={filters.timeType}
                id="exampleSelect"
                name="select"
                type="select"
                onChange={handleInput("timeType")}
              >
                <option value=""> Seçin </option>
                <option value="startDate">Verilmə tarixi</option>
                <option value="endDate">Bitmə tarixi</option>

              </Input>
            </FormGroup>
            :
            <FormGroup>
              <Label for="exampleSelect">Növ</Label>
              <Input
                value={filters.transaction}
                id="exampleSelect"
                name="select"
                type="select"
                onChange={handleInput("transaction")}
              >
                <option value="">Seçin</option>
                <option>Avtorizasiya</option>
                <option>Avtorizasiya 1</option>
                <option>Avtorizasiya 2</option>
              </Input>
            </FormGroup>
          }
          <FormGroup className="filter-div-btn">
            <Button className="filter-btn">
              Axtar
            </Button>
            <a href="#" className="reset-link" onClick={() => resetFilter()}>
              Filterləri sıfırla
            </a>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
}
