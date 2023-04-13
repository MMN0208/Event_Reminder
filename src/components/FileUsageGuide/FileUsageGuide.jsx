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
            <span className='question'>File Usage Guide & Feedback</span>
        </p>

        <div className={`file-usage-guide ${showDetails ? 'file-usage-guide-show' : 'file-usage-guide-hide'}`}>
            <section className="faq-section">
                <h2>How to use the .ics file</h2>
                <h3>For PC/laptop users:</h3>
                <h4>Import into Google Calendar</h4>
                <ol>
                    <li>Go to the following address: <a target="_blank" rel="noopener noreferrer" href="https://calendar.google.com" className='link'>https://calendar.google.com</a>.</li>
                    <li>Select <i className='fa fa-gear highlight'></i> at the top right corner, then select <i className='highlight'>Settings</i>.</li>
                    <li>Select <i className='highlight'>Import & export</i> on the sidebar.</li>
                    <li>Select <i className='highlight'>Select file from your computer</i>.</li>
                    <li>Select the file you just downloaded, its default name is <code>schedule.ics</code>.</li>
                    <li>Choose the calendar you would want to hold the imported events. You can refer to <a href="https://support.google.com/calendar/answer/37095?hl=vi" className='link'>here</a> to create more calendars for your account.</li>
                    <li>Select <i className='highlight'>Import</i>.</li>
                </ol>
                <h4>Import into default calendar app</h4>
                <ol>
                    <li>Open the file you just downloaded, its default name is <code>schedule.ics</code>.</li>
                    <li>Each operating system will have its own popup menu for importing events into its calendar app.</li>
                    <li>Select <i className='highlight'>Add events</i> to add the events into the device's calendar app.</li>
                </ol>
                <h3>For smartphone users:</h3>
                <ol>
                    <li>Press the <i className='highlight'>Download</i> button, a menu will appear.</li>
                    <li>Press <i className='highlight'>Add events</i> to add the events into the device's calendar app.</li>
                </ol>
            </section>
            <section className="faq-section">
                <h2>Providing feedback</h2>
                <p>Please spend a few minutes to give us your feedback in <a href="https://forms.gle/U3MydtV2ZWwMuirPA" target="_blank" rel="noopener noreferrer" className='link'>this form</a>. We will be glad to receive your feedback.</p>
            </section>
            
        </div>
    </div>
}

export default FileUsageGuide;