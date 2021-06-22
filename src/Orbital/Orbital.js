import React from "react";
import sol from "./sol.png";
import orbit1 from "./orbit1.png";
import orbit2 from "./orbit2.png";
import orbit3 from "./orbit3.png";
import "./orbital.css";


export default function Orbital() {

    return (
        <div className="orbital">
            <div className="orbital-element"><img className="sol" src={sol} alt=""/></div>
            <div className="orbital-element"><img className="orbital-one" src={orbit1} alt=""/></div>
            <div className="orbital-element"><img className="orbital-two" src={orbit2} alt=""/></div>
            <div className="orbital-element"><img className="orbital-three" src={orbit3} alt=""/></div>
        </div>
    )
}