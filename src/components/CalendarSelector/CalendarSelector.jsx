import React from 'react';
import './CalendarSelector.css';

function filterBySemester(eventList, filter) {
    if(filter.length > 0) {
        let semester = filter[0].semester;
        let year = (semester === "1") ? filter[0].ay[0] : filter[0].ay[1];
        return eventList.filter(event => event.semester === semester && event.year === year);
    }
    return eventList;
}

function CalendarSelector(props) {
    const filter = props.currFilter;
    const filteredList = filterBySemester(props.eventList, filter);
    const selectors = filteredList.map(eachClass => {
        return <div key={eachClass.signature} className="class-item_wrapper">
            <input id={eachClass.signature} type='checkbox' name={eachClass.name} value={eachClass.signature} onChange={props.changeHandler} checked={eachClass.selected} className="class-selector_checkbox" />
            <label htmlFor={eachClass.signature} className='class-selector_label'>
                {((eachClass.event_type === 1) ? (eachClass.exam_type === 0 ? 'Thi giữa kỳ ' : 'Thi cuối kỳ ') : 'Lớp ') + eachClass.name}
            </label>
            <br />
        </div>
    }
    );

    return <div className={filteredList.length > 0 ? "calendar-selector_wrapper" : "calendar-selector_wrapper-empty"} >
        {selectors}
    </ div>;
}

export default CalendarSelector;