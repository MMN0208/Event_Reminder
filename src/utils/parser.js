import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

function parseCalendarInput(input) {
    let line = input.split('\n');

    const lineCount = line.length;
    let filterList = [];
    let eventList = [];

    let semester = null;
    let event_type = null;
    let ay = [];

    for (let i = 0; i < lineCount; i++) {
        let tokenizedLine = line[i].split('\t'); // each token is separated by \t (tab)

        if (tokenizedLine.length === 1) {
            if (tokenizedLine[0].trim() === '') {
                event_type = null;
                continue;
            }

            let semester_ay = tokenizedLine[0].trim().match(/HK([1-3])\s\((20[0-9][0-9])-(20[0-9][0-9])\)|Học\skỳ\s([1-3])\sNăm\shọc\s(20[0-9][0-9])\s-\s(20[0-9][0-9])/);
            if (semester_ay != null) {
                event_type = (semester_ay[0].match(/HK([1-3])\s\(20[0-9][0-9]-20[0-9][0-9]\)/) != null) ? 1 : 2;
                semester = (event_type === 1) ? semester_ay[1].trim() : semester_ay[4].trim();
                ay = [];
                ay.push((event_type === 1) ? semester_ay[2].trim() : semester_ay[5].trim());
                ay.push((event_type === 1) ? semester_ay[3].trim() : semester_ay[6].trim());
                filterList.push({semester, ay});
            }
            else continue;
        }

       else if (event_type === 1 && tokenizedLine.length === 9) {
            // subject ID, name and group
            let ID = tokenizedLine[0].trim();
            let name = tokenizedLine[1].trim();
            let group = tokenizedLine[2].trim();

            let date = [];
            let time = [];
            let room = [];

            // midterm: index 0, final: index 1
            date.push(tokenizedLine[3].trim().split('/'), tokenizedLine[6].trim().split('/'));
            time.push(tokenizedLine[4].trim().match(/\d+/g), tokenizedLine[7].trim().match(/\d+/g));
            room.push(tokenizedLine[5].trim(), tokenizedLine[8].trim());

            let day = [];
            let month = [];

            day.push(date[0][0].trim(), date[1][0].trim());
            month.push(date[0][1].trim(), date[1][1].trim());

            for (let exam_type = 0; exam_type < 2; exam_type++) {
                if(day[exam_type] !== '' && month[exam_type] !== '' && time[exam_type] != null && room[exam_type] !== '--') {
                    let year = (semester === '1' && parseInt(month) >= 8) ?  ay[0] : ay[1];

                    eventList.push({
                        signature: Base64.stringify(sha256(ID + day[exam_type] + month[exam_type] + year + time[exam_type].join('') + room[exam_type])),
                        event_type,
                        ID,
                        name,
                        day: day[exam_type],
                        month: month[exam_type],
                        year,
                        time: time[exam_type],
                        room: room[exam_type],
                        selected: true,
                        group,
                        exam_type,
                        semester,
                        ay
                    });
                }
                else continue;
            }
        }

        else if (event_type === 2 && tokenizedLine.length === 11) {
            // subject ID, name and group
            let ID = tokenizedLine[0].trim();
            let name = tokenizedLine[1].trim();
            let group = tokenizedLine[4].trim();
    
            // day
            let day = tokenizedLine[5].trim();
            if (isNaN(parseInt(day, 10))) {
                continue; // invalid day
            } else {
                day = parseInt(day, 10);
            }
            
            // time
            let time = tokenizedLine[7].trim().match(/\d+:\d+/g);
            if (time === null) {
                continue;
            }
    
            // room and campus
            let room = tokenizedLine[8].trim();
            let campus = tokenizedLine[9].trim();
    
            // week
            let week = tokenizedLine[10].trim().match(/\d+/g);
            if (week === null) {
                continue;
            }

            let year = (semester === '1') ?  ay[0] : ay[1];

            eventList.push({
                signature: Base64.stringify(sha256(ID + day.toString() + week.join('') + time.join('') + room)),
                event_type,
                ID,
                name,
                day,
                week,
                year,
                time,
                room,
                campus,
                selected: true,
                group,
                semester,
                ay
            });
        }
        else continue;
    }
    console.log(filterList, eventList);
    return [filterList, eventList];
}

export { parseCalendarInput };
