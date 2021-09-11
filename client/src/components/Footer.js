import React from "react";

function Footer() {
  return (
    <footer>
      <div className="first text-white p-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 d-flex p-2">
              <img
                src="https://rashed-abir.web.app/static/media/rashed%20abir.bad348d4.JPEG"
                alt="rashed abir"
                width="80"
              />
              <div className="ms-4">
                <h5 className="text-uppercase">codeblogs</h5>
                <p className="text-muted">"You will like the way You Code"</p>
              </div>
            </div>
            <div className="col-lg-2 mx-auto text-center p-2">
              <h5 className="text-uppercase">follow me</h5>
              <div className="de-flex">
                <a href="https://www.facebook.com/abu.rashed.abir/">
                  <i className="fab fa-facebook-square mx-1 fs-3 icon"></i>
                </a>
                <a href="https://www.github.com/rashedabir/">
                  <i className="fab fa-github-square mx-1 fs-3 icon"></i>
                </a>
                <a href="https://www.linkedin.com/in/rashedabir/">
                  <i className="fab fa-linkedin mx-1 fs-3 icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second text-white text-center py-3">
        Developed by <a href="https://rashed-abir.web.app/">Rashed Abir</a>
      </div>
    </footer>
  );
}

export default Footer;
