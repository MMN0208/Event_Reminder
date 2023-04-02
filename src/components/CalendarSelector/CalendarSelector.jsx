import React from 'react';
import './CalendarSelector.css';
function CalendarSelector(props) {
    const selectors = props.eventList.map((eachClass, index) => {
        return <div key={eachClass.signature} className="class-item_wrapper">
            <input id={eachClass.signature} type='checkbox' name={eachClass.name} value={eachClass.signature} onChange={props.changeHandler} checked={eachClass.selected} className="class-selector_checkbox" />
            <label htmlFor={eachClass.signature} className='class-selector_label'>
                { ((eachClass.event_type === 1) ? (eachClass.exam_type === 0 ? 'Thi giữa kỳ ' : 'Thi cuối kỳ ') : 'Lớp ') + eachClass.name}
            </label>
            <br />
        </div>
    }
    );

    return <div className={props.eventList.length > 0 ? "calendar-selector_wrapper" : "calendar-selector_wrapper-empty"} >
        {selectors}
    </ div>;
}

export default CalendarSelector;