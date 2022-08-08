import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { Card, Col, Row } from "react-bootstrap";

const LangBar = observer(() => {
  const { test } = useContext(Context);
  return (
    <Col className="d-flex">
      {test.langs.map((lang) => (
        <Card
          style={{ cursor: "pointer" }}
          key={lang.id}
          className="p-3"
          onClick={() => test.setSelectedLang(lang)}
          border={lang.id === test.selectedLang.id ? "danger" : "light "}
        >
          {lang.name}
        </Card>
      ))}
    </Col>
  );
});

export default LangBar;
