import React from "react";
import "./App.css";

import GuideLine from "./components/GuideLine/GuideLine";
import CalendarInputField from "./components/CalendarInput/CalendarInput";
import CalendarSelector from "./components/CalendarSelector/CalendarSelector";
import DownloadButton from "./components/DownloadButton/DownloadButton";
import FileUsageGuide from "./components/FileUsageGuide/FileUsageGuide";
import Footer from "./components/Footer/Footer";

import { parseCalendarInput } from "./utils/parser";
import { generateICSFileContent } from "./utils/generator";

import FileSaver from "file-saver";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarInput: "", // the input field of calendar checkbox
      eventList: [], // the list of class after parsing the input
      timeTableValid: false,
    };
    this.handleCalendarInputChange = this.handleCalendarInputChange.bind(this);
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleCalendarInputChange(event) {
    this.setState({ calendarInput: event.target.value });

    const eventList = parseCalendarInput(event.target.value);

    this.setState({ eventList });
  }

  handleCalendarSelect(event) {
    const targetSignature = event.target.value;
    let eventList = this.state.eventList;
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i].signature === targetSignature) {
        eventList[i].selected = !eventList[i].selected;
        break;
      }
    }
    this.setState({ eventList });
  }

  handleDownload() {
    const content = generateICSFileContent(this.state.eventList);
    let blob = new Blob([content], { type: "text/calendar" });
    FileSaver.saveAs(blob, "schedule.ics");
  }

  render() {
    return (
      <React.StrictMode>
        <div id="app" className="light-theme">
          <div id="app_wrapper">
            <div className="header_wrapper">
              <div className="header_col">
                <div className="header_row">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="HCMUT logo" className="header_img"></img>
                  <div className="header">
                    <p className="header_one">
                      Event
                    </p>
                    <p className="header_two">
                      Reminder
                  </p>  
                  </div>
                </div>
                <div className="header_row header_slogan">
                  <p>
                    Reminds you of lectures and exams
                  </p>
                </div>
              </div>
            </div>
            <GuideLine
              num={1}
              text={
                "Copy and paste the timetable or exam schedule of the semester(s) you want to export here."
              }
            />
            <CalendarInputField
              value={this.state.calendarInput}
              onChange={this.handleCalendarInputChange}
            />
            <GuideLine
              num={2}
              text={"Choose the event(s) you want to export."}
            />
            <CalendarSelector
              eventList={this.state.eventList}
              changeHandler={this.handleCalendarSelect}
            />
            <GuideLine
              num={3}
              text={"Select Download to download the ics file."}
            />
            <div className="button_wrapper">
              <DownloadButton
                isDownloadable={
                  this.state.eventList.length !== 0 &&
                  this.state.eventList.filter((c) => c.selected).length !== 0
                }
                clickHandler={this.handleDownload}
              />
            </div>
            <FileUsageGuide />
            <Footer />
          </div>
        </div>
      </React.StrictMode>
    );
  }
}
export default App;
