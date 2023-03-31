import React from 'react';
import './DownloadButton.css';
function DownloadButton(props) {
    return <button onClick={props.clickHandler} disabled={!props.isDownloadable} className="download-button">Download</button>
}

export default DownloadButton;