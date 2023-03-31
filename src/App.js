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
      classList: [], // the list of class after parsing the input
      timeTableValid: false,
    };
    this.handleCalendarInputChange = this.handleCalendarInputChange.bind(this);
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleCalendarInputChange(event) {
    this.setState({ calendarInput: event.target.value });

    const classList = parseCalendarInput(event.target.value);

    this.setState({ classList });
  }

  handleCalendarSelect(event) {
    const targetSignature = event.target.value;
    let classList = this.state.classList;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].signature === targetSignature) {
        classList[i].selected = !classList[i].selected;
        break;
      }
    }
    this.setState({ classList });
  }

  handleDownload() {
    const content = generateICSFileContent(this.state.classList);
    let blob = new Blob([content], { type: "text/calendar" });
    FileSaver.saveAs(blob, "export.ics");
  }

  componentDidMount() {
    let localStorage = window.localStorage;
    const oldTheme = localStorage.getItem("theme");
    if (oldTheme !== null) {
      this.setState({ theme: oldTheme });
    } else {
      this.setState({ theme: "light" });
      localStorage.setItem("theme", "light");
    }
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
                      Exam
                    </p>
                    <p className="header_two">
                      Reminder
                  </p>  
                  </div>
                </div>
                <div className="header_row header_slogan">
                  <p>
                    To never forget your exams
                  </p>
                </div>
              </div>
            </div>
            <GuideLine
              num={1}
              text={
                "Copy and paste the exam schedule of semester(s) you want to export here."
              }
            />
            <CalendarInputField
              value={this.state.calendarInput}
              onChange={this.handleCalendarInputChange}
            />
            <GuideLine
              num={2}
              text={"Choose the exam(s) you want to export."}
            />
            <CalendarSelector
              classList={this.state.classList}
              changeHandler={this.handleCalendarSelect}
            />
            <GuideLine
              num={3}
              text={"Select Download to download the ics file."}
            />
            <div className="button_wrapper">
              <DownloadButton
                isDownloadable={
                  this.state.classList.length !== 0 &&
                  this.state.classList.filter((c) => c.selected).length !== 0
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
