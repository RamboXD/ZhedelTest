import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { Row } from "react-bootstrap";
import TestInfo from "./TestInfo.js";


const TestList = observer(() => {
  const { test } = useContext(Context);
  return (
    <Row className="d-flex">
        { test.tests.map(test =>
            <TestInfo key={test.id} test={test}/>
        )}
    </Row>
  );
});

export default TestList;
