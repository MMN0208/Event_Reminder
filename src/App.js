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
                  <img src="/logo.png" alt="BK Reminder logo" className="header_img"></img>
                </div>
              </div>
            </div>
            <div className="body_wrapper">
              <GuideLine
                num={1}
                text={
                  "Paste the timetable or exam schedule of the semester(s) you need here."
                }
              />
              <CalendarInputField
                value={this.state.calendarInput}
                onChange={this.handleCalendarInputChange}
              />
              <GuideLine
                num={2}
                text={"Choose which event(s) you need."}
              />
              <CalendarSelector
                eventList={this.state.eventList}
                changeHandler={this.handleCalendarSelect}
              />
              <GuideLine
                num={3}
                text={"Download the .ics file."}
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
            </div>
            <div className="footer_wrapper">
              <Footer />
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}
export default App;
