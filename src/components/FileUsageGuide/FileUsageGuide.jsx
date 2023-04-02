import React, { useState } from 'react';
import "./FileUsageGuide.css";

function FileUsageGuide() {
    let [showDetails, setShowDetails] = useState(false);
    function clickHandler() {
        setShowDetails(!showDetails);
    }
    return <div className={'file-usage-guide_wrapper'}>
        <p className="file-usage-guide_question" onClick={clickHandler}>
            <i className={`fas fa-chevron-right arrow ${showDetails ? 'point-down' : 'point-right'}`}></i>
            <span className='question'>Instructions & Feedback</span>
        </p>

        <div className={`file-usage-guide ${showDetails ? 'file-usage-guide-show' : 'file-usage-guide-hide'}`}>
            <section className="faq-section">
                <h2>How can I use the ics file?</h2>
                <h3>For PC/laptop users:</h3>
                <ol>
                    <li>Go to the following address: <a target="_blank" rel="noopener noreferrer" href="https://calendar.google.com" className='link'>https://calendar.google.com</a>.</li>
                    <li>Select the <i className='highlight'>cogwheel</i> at the top right corner, a menu will appear, then select <i className='highlight'>Settings</i>.</li>
                    <li>Select <i className='highlight'>Import & export</i> on the left side of the page.</li>
                    <li>Select <i className='highlight'>Select file from your computer</i>.</li>
                    <li>Select the file you just downloaded, its default name is <code>schedule.ics</code>.</li>
                    <li>Choose the calendar you would want to hold the imported events. You can refer to <a href="https://support.google.com/calendar/answer/37095?hl=vi" className='link'>here</a> to create more calendars for your account.</li>
                    <li>Select <i className='highlight'>Import</i>.</li>
                </ol>
                <h3>For smartphone users:</h3>
                <ol>
                    <li>Open the file you just downloaded from your browser or the Files app of your phone.</li>
                    <li>Each operating system (Android/iOS) will have its own notification about importing events into its Calendar app.</li>
                    <li>Follow the app's instructions.</li>
                </ol>
            </section>
            <section className="faq-section">
                <h2>I ran into issues when using the app, the software generated incorrect results.</h2>
                <p>I am so sorry to hear that. You can let me know at my <a href="https://www.facebook.com/zucczucczucc16.8" target="_blank" rel="noopener noreferrer" className='link'>Facebook</a>. I will be glad to receive your feedback.</p>
            </section>
            
        </div>
    </div>
}

export default FileUsageGuide;