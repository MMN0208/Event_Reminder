import { v4 as uuidv4 } from 'uuid';

function getMissingWeeks(start, end) {
    const weeks = []
    if (start < end - 1) {
        let mid = Math.floor((start + end) / 2);
        weeks.push(...getMissingWeeks(start, mid));
        weeks.push(mid)
        weeks.push(...getMissingWeeks(mid, end));
    }
    return weeks;
}

function getDateOfFirstDayOfFirstWeek(year) {
    const date = new Date(year, 0, 1);
    if ((date.getDay() + 6) % 7 === 0) return date;
    if ((date.getDay() + 6) % 7 < 4) {
        date.setDate(date.getDate() - (date.getDay() + 6) % 7);
        return date;
    } else {
        date.setDate(8 - (date.getDay() + 6) % 7);
        return date;
    }
}

function classToTimeString(day, week, year, time) {
    let times = time.match(/\d+/g);
    let date = getDateOfFirstDayOfFirstWeek(year);
    date.setHours(times[0], times[1]);

    const week_offset = week - 1;
    const day_offset = day - 2;

    date.setDate(date.getDate() + (week_offset * 7) + day_offset);
    let timeString = date.toISOString();

    return (timeString.split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '');
}

function examToTimeString(day, month, year, time) {
    let monthInd = parseInt(month) - 1;
    let date = new Date(year, monthInd, day, time[0], time[1]);
    let timeString = date.toISOString();
    return (timeString.split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '');
}

function generateEvent(event) {
    if (event.event_type === 1) {
        let summary = '';
        if (event.exam_type === 0) {
            summary = 'Thi giữa kỳ ' + event.name;
        }
        else {
            summary = 'Thi cuối kỳ ' + event.name;
        }

        let end_time = [];
        end_time[0] = parseInt(event.time[0]) + 1;
        end_time[1] = parseInt(event.time[1]);

        let content = `BEGIN:VEVENT
UID:${uuidv4()}
DTSTAMP:${(new Date().toISOString().split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '')}
SUMMARY:${summary}
DESCRIPTION:Mã môn: ${event.ID}\\nMã lớp: ${event.group}
LOCATION:${event.room}
DTSTART:${examToTimeString(event.day, event.month, event.year, event.time)}
DTEND:${examToTimeString(event.day, event.month, event.year, end_time)}
BEGIN:VALARM
TRIGGER:-PT48H
DURATION:PT15M
ACTION:DISPLAY
DESCRIPTION:${summary}
END:VALARM
END:VEVENT`;
        return content;
    }
    else {
        let summary = 'Lớp ' + event.name;
        let numOfWeeks = event.week.length;
        let missingWeeks = []
        let missingTime = []

        for (let i = 0; i < numOfWeeks - 1; i++) {
            missingWeeks.push(...getMissingWeeks(parseInt(event.week[i]), parseInt(event.week[i + 1])));
        }

        for (let i = 0 ; i < missingWeeks.length; i++) {
            missingTime.push(classToTimeString(event.day, missingWeeks[i], event.year, event.time[0]));
        }

        let content = `BEGIN:VEVENT
UID:${uuidv4()}
DTSTAMP:${(new Date().toISOString().split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '')}
SUMMARY:${summary}
DESCRIPTION:Mã môn: ${event.ID}\\nMã lớp: ${event.group}
LOCATION:${event.room}, ${event.campus}
DTSTART:${classToTimeString(event.day, event.week[0], event.year, event.time[0])}
DTEND:${classToTimeString(event.day, event.week[0], event.year, event.time[1])}
RRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=${classToTimeString(event.day, event.week[numOfWeeks-1], event.year, event.time[0])}`;

        if (missingTime.length > 0) {
            content += `
EXDATE:${missingTime.join(',')}`;
        }

        content += `
BEGIN:VALARM
TRIGGER:-PT30M
DURATION:PT15M
ACTION:DISPLAY
DESCRIPTION:${summary}
END:VALARM
END:VEVENT`;
        return content;
    }
}

function generateICSFileContent(eventList) {
    let content = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:BK Reminder`;

    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].selected) {
            content += `
${generateEvent(eventList[i])}`
        }
    }

    content += `
END:VCALENDAR`;
    return content;
}

export { generateICSFileContent };
