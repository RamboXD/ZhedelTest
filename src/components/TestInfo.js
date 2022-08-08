import React, { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
// import { observer } from "mobx-react-lite";
// import { Context } from "../index.js";
// import { Row } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { TEST_ROUTE } from "../utils/consts.js";

const TestInfo = ({ test }) => {
  const navigate = useNavigate()  
  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(TEST_ROUTE + '/' + test.id)}>
      <Card style={{ width: "150px", cursor: "pointer" }} border={"light"}>
        <Image width="150px" height="150px" src={test.img} />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Қазақша</div>
          <div className="d-flex align-items-center">
            <div>{test.rating}</div>
            <Image width="20px" height="20px" src={test.img} />
          </div>
        </div>
          <div>Қосу-Азайту</div>
      </Card>
    </Col>
  );
};

export default TestInfo;
