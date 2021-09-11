import React from "react";
import { SocialIcon } from "react-social-icons";

function SocialContact() {
  return (
    <div className="bg-white p-3 border mb-4">
      <h5 className="text-uppercase title">follow me</h5>
      <div className="text-center pt-3">
        <SocialIcon
          className="mx-2"
          url="https://www.facebook.com/abu.rashed.abir/"
        />
        <SocialIcon className="mx-2" url="https://www.github.com/rashedabir/" />
        <SocialIcon
          className="mx-2"
          url="https://www.linkedin.com/in/rashedabir/"
        />
        <SocialIcon
          className="mx-2"
          url="https://www.instagram.com/rashedabir_"
        />
      </div>
    </div>
  );
}

export default SocialContact;
