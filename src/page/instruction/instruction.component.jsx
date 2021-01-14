import React from "react";

import "./instruction.styles.scss";

function Instruction() {
  return (
    <div className="instruction">
      <div className="section">
        <h1>Nomination: </h1>
        <br />
        <ul>
          <li>
            Each user is allowed to nominate at most 5 movies / TV series of all
            time. You can nominate and un-nominate before submitting your final
            decision. However, when final decisions are made and submitted, you
            cannot make changes anymore.
          </li>
          <li>
            Please sign in to nominate. (For test purpose, sign-up, and sign-in
            can use made-up email addresses, there will be no identity
            verification.)
          </li>
        </ul>
      </div>
      <div className="section">
        <hr />
        <h1>Results: </h1>
        <br />
        <ul>
          <li>
            The results show the total nomination status. It only shows top 6
            most nominated movies. Sorted from the most to the least. Its also
            shows the total number of votes.
          </li>
        </ul>
      </div>
      <div className="section">
        <hr />
        <h1>Profile: </h1>
        <br />
        <ul>
          <li>You can check out account and nomoniations</li>
        </ul>
      </div>
    </div>
  );
}

export default Instruction;
