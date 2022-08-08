import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      bgColor="white"
      className="mt-3 shadow-lg text-center text-lg-start text-muted"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Менімен байланысқа шығатын әлеуметтік желілер:</span>
        </div>

        <div className="d-flex justify-content-center">
          <a href="https://github.com/RamboXD" className="ms-4 text-reset">
            <i className="fa fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/raiymbek-nazymkhan/"
            className="ms-4 text-reset"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="" className="ms-4 text-reset">
            <i className="fa fa-google"></i>
          </a>
          <a href="" className="ms-4 text-reset">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a href="" className="ms-4 text-reset">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="" className="ms-4 me-2 text-reset">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </section>

      <section className="footer">
        <div
          className="row mt-3"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fa fa-gem me-3"></i>Тестілеу Орталығы
            </h6>
            <p>
              Құрылған сайттың басты мақсаты қолданушыға оңай әрі тез тест
              құрастыруға, шәкірттердің білімін тексеруге, құрастырылған
              тесттармен бөлісуге, басқа қолданушылардың тесттарын бағалауға
              мүмкіндік беру.
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Байланыс</h6>
            <p>
              <i className="fa fa-home me-3"></i> Нұр-Сұлтан, 010000, Қазақстан
            </p>
            <p>
              <i className="fa fa-envelope me-3"></i>
              rnazymxan@gmail.com
            </p>
            <p>
              <i className="fa fa-phone me-3"></i> +7 (705) 846 0979
            </p>
            <p>
              <i className="fa fa-print me-3"></i> +7 (705) 846 0979
            </p>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="">
          RamboBatya.com
        </a>
      </div>
    </MDBFooter>
  );
}
