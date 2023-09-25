import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <h6>About Us</h6>
              <p className="text-justify">
                sumitcoder.in <i>CODE WANTS TO BE SIMPLE </i> is an initiative
                to help the upcoming programmers with the code. Sumit Singh
                focuses on providing the most efficient code or snippets as the
                code wants to be simple. We will help programmers build up
                concepts in different programming languages that include C, C++,
                Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and
                Algorithm.
              </p>
            </div>
            <div className="col-xs-6 col-md-2">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <a href="/#.">UI Design</a>
                </li>
                <li>
                  <a href="/#.">PHP</a>
                </li>
                <li>
                  <a href="/#.">Android</a>
                </li>
                <li>
                  <a href="/#.">Templates</a>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-2">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link exact="true" aria-current="page" className="active" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link exact="true" aria-current="page" className="active" to="/add-student">
                    Add Student
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Get in Touch</h6>
              <ul className="social-icons">
                <li>
                  <a
                    className="facebook"
                    target="_sumit"
                    href="https://www.facebook.com/sumitsingh0003/"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    target="_sumit"
                    href="https://www.instagram.com/sumitsingh0003/"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    target="_sumit"
                    href="https://www.instagram.com/sumitsingh0003/"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    target="_sumit"
                    href="https://www.linkedin.com/in/sumitsingh0003/"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright © 2023 All Rights Reserved.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <p className="developed-text">
                Powered by
                <a target="_sumit" href="https://sumitcoder.in/"> Sumit Singh</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
