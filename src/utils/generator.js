import { v4 as uuidv4 } from 'uuid';

// function genTimeString(week, dayOfWeek, time) { // time in the format hh:mm
//     let times = time.match(/\d+/g);

//     let date = new Date(2023, 0, 2, times[0], times[1]); //start of week 1 used to calculate using offset

//     const weekOfset = week - 1;
//     const dayOfset = dayOfWeek - 2;

//     date.setDate(date.getDate() + (weekOfset * 7) + dayOfset);
//     let timeString = date.toISOString();

//     return (timeString.split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '');
// }

function toTimeString(day, month, time) {
    let monthInd = parseInt(month) - 1;
    let date = new Date(2023, monthInd, day, time[0], time[1]);
    let timeString = date.toISOString();
    return (timeString.split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '');
}

function generateEvent(clss) {
    let summary = ''
    if (clss.type === 0) {
        summary = 'Thi giữa kỳ ' + clss.name;
    }
    else {
        summary = 'Thi cuối kỳ ' + clss.name;
    }

    let end_time = [];
    end_time[0] = parseInt(clss.time[0]) + 1;
    end_time[1] = parseInt(clss.time[1]);

    let content = `BEGIN:VEVENT
UID:${uuidv4()}
DTSTAMP:${(new Date().toISOString().split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '')}
SUMMARY:${summary}
DESCRIPTION:Mã môn: ${clss.ID}\\nMã lớp: ${clss.group}
LOCATION:${clss.room}
DTSTART:${toTimeString(clss.day, clss.month, clss.time)}
DTEND:${toTimeString(clss.day, clss.month, end_time)}
END:VEVENT`
    return content;
}

// function generateClass(clss) {
//     let repeatTime = []

//     for (let i = 1; i < clss.week.length; i++) {
//         repeatTime.push(toTimeString(clss.week[i], clss.dayOfWeek, clss.time[0]))
//     }

//     let content = `BEGIN:VEVENT
// UID:${uuidv4()}
// DTSTAMP:${(new Date().toISOString().split('.')[0] + 'Z').replace(/-/g, '').replace(/:/g, '')}
// SUMMARY:${clss.name}
// DESCRIPTION:Mã môn: ${clss.ID}\\nMã lớp: ${clss.group}
// LOCATION:${clss.room}, ${clss.campus}
// DTSTART:${toTimeString(clss.week[0], clss.dayOfWeek, clss.time[0])}
// DTEND:${toTimeString(clss.week[0], clss.dayOfWeek, clss.time[1])}
// RDATE:${repeatTime.join(',')}
// END:VEVENT`
//     return content;
// }

function generateICSFileContent(classList) {
    let content = `BEGIN:VCALENDAR
VERSION:0.1
PRODID:-//exam_reminder//`;

    for (let i = 0; i < classList.length; i++) {
        if (classList[i].selected) {
            content += `
${generateEvent(classList[i])}`
        }
    }

    content += `
END:VCALENDAR`;
    return content;
}


export { toTimeString, generateICSFileContent };
