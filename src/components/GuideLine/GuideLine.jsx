import React from 'react';
import "./GuideLine.css";

function GuideLine(props) {
    return <div className="guide-line_wrapper">
        <div className="guide-line_shape">
            <div className="guide-line_number">
                {props.num}
            </div>
        </div>
        <span className="guide-line_description">{props.text}</span>
    </div>
}

export default GuideLine;