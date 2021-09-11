import React from "react";
import contact from "../assets/contact.png";
import emailjs, { init } from "emailjs-com";
import { toast } from "react-toastify";

function Contact() {
  const senEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hj3k0zc",
        "template_csuns97",
        e.target,
        init("user_NPCWk4iy19PVCtKgYnwXv")
      )
      .then(
        () => {
          toast.success("Email Sent");
        },
        (error) => {
          toast.error(error);
        }
      );
    e.target.reset();
  };

  return (
    <div className="bg-white border container py-3">
      <h5 className="text-uppercase title">contact me</h5>
      <img src={contact} alt="contact" width="100%" />
      <form className="pt-4 text-center" onSubmit={senEmail}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Your Name"
            required
            name="name"
          />
          <label for="floatingInput">Your Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            name="email"
          />
          <label for="floatingInput">Your Email</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Leave a message here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
            required
            name="message"
          ></textarea>
          <label for="floatingTextarea2">Your Message</label>
        </div>
        <button
          type="submit"
          className="btn custom_button text-uppercase w-100 py-2 my-2 fs-6"
        >
          send
        </button>
      </form>
    </div>
  );
}

export default Contact;
