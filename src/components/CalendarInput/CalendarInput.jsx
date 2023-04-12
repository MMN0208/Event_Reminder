import React from 'react';
import './CalendarInput.css';

function CalendarInputField(props) {
    return <textarea rows="5" type='text' value={props.value} onChange={props.onChange} className='calendar-input' placeholder="HK2 (2022-2023) or Học kỳ 2 Năm học 2022 - 2023&#10;Ngày cập nhật:...&#10;MÃ MH TÊN MÔN HỌC...&#10;SP1039	Lịch sử Đảng Cộng sản VN..." wrap="soft"></textarea>
}

export default CalendarInputField;