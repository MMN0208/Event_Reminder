import { v4 as uuidv4 } from 'uuid';

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
        let repeatTime = []

        for (let i = 1; i < event.week.length; i++) {
            repeatTime.push(classToTimeString( event.day, event.week[i], event.year, event.time[0]))
        }

        let content = `BEGIN:VEVENT
UID:${uuidv4()}
DTSTAMP:${(new Date().toISOString().split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '')}
SUMMARY:${summary}
DESCRIPTION:Mã môn: ${event.ID}\\nMã lớp: ${event.group}
LOCATION:${event.room}, ${event.campus}
DTSTART:${classToTimeString(event.day, event.week[0], event.year, event.time[0])}
DTEND:${classToTimeString(event.day, event.week[0], event.year, event.time[1])}
RDATE:${repeatTime.join(',')}
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
PRODID:-//event_reminder//`;

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
