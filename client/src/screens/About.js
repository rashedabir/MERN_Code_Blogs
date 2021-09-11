import React from "react";

function About() {
  return (
    <div className="bg-white border container py-3">
      <h2 className="text-uppercase pb-3">about me</h2>
      <div className="border-top pt-4">
        <h3>
          Welcome to <strong>Code Blogs</strong>,
        </h3>
        <h5 className="py-2">
          Hi there! My name is <strong>Rashed</strong>. I'm currently pursuing{" "}
          <strong>B.SC in CSE</strong> from
          <strong>Daffodil International University (DIU)</strong>. I consider
          myself who is persistent, a <strong>quick learner</strong>, and loves{" "}
          <strong>problem-solving</strong> by using simple and scalable
          solutions. In my everyday life, I try to love reading a book, write
          different things, helping people, and <strong>coding</strong> as well.
          I also think about different sorts of people. That basically inspires
          me as a different aspect. If you have any <strong>questions</strong>,
          please don't hesitate to <strong>contact me</strong>.
        </h5>
      </div>
      <div className="text-center pt-4">
        <h5>
          Email : <span>rashedabir.cse@hotmail.com</span>
        </h5>
      </div>
      <h6 className="pt-4">Sincerly,</h6>
      <h6>Rashed Khan</h6>
    </div>
  );
}

export default About;
