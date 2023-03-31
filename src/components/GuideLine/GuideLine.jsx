import React from 'react';
import "./GuideLine.css";

function GuideLine(props) {
    return <div className="guide-line_wrapper">
        <span className="guide-line_number">
            {props.num}
        </span>
        <span className="guide-line_description">{props.text}</span>
    </div>
}

export default GuideLine;