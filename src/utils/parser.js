import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

function parseCalendarInput(input) {
    let line = input.split('\n');

    const lineCount = line.length;
    let classList = [];

    let semester = null;
    let ay = [];

    for (let i = 0; i < lineCount; i++) {
        let tokenizedLine = line[i].split('\t'); // each token is separated by \t (tab)

        if (tokenizedLine.length === 1) {
            let semester_ay = tokenizedLine[0].trim().match(/HK([1-3])\s\((20[0-9][0-9])-(20[0-9][0-9])\)/);
            if(semester_ay != null) {
                semester = semester_ay[1].trim();
                ay = [];
                ay.push(semester_ay[2].trim());
                ay.push(semester_ay[3].trim());
            }
            else continue;
        }

       else if (tokenizedLine.length === 9) {
            // subject ID, name and group
            let ID = tokenizedLine[0].trim();
            let name = tokenizedLine[1].trim();
            let group = tokenizedLine[2].trim();
    
            // midterm date, time and room
            let date = tokenizedLine[3].trim().split('/');
            let time = tokenizedLine[4].trim().match(/\d+/g);
            let room = tokenizedLine[5].trim();
    
            let day = date[0].trim();
            let month = date[1].trim();
    
            if (day !== '' && month !== '' && time !== '' && room !== '--') {
                let type = 0;
                let year = new Date().getFullYear();

                if (semester != null) {
                    year = (semester === '1' && parseInt(month) >= 8) ?  ay[0] : ay[1];
                }
                
                classList.push({
                    signature: Base64.stringify(sha256(ID + day + month + year + time.join('') + room)),
                    ID,
                    name,
                    day,
                    month,
                    year,
                    time,
                    room,
                    selected: true,
                    group,
                    type
                });
            }
    
            // final date, time and room
            date = tokenizedLine[6].trim().split('/');
            time = tokenizedLine[7].trim().match(/\d+/g);
            room = tokenizedLine[8].trim();
    
            day = date[0].trim();
            month = date[1].trim();
    
            if (day !== '' && month !== '' && time !== '' && room !== '--') {
                let type = 1;
                let year = new Date().getFullYear();

                if (semester != null) {
                    year = (semester === '1' && parseInt(month) >= 8) ?  ay[0] : ay[1];
                }

                classList.push({
                    signature: Base64.stringify(sha256(ID + day + month + year + time.join('') + room)),
                    ID,
                    name,
                    day,
                    month,
                    year,
                    time,
                    room,
                    selected: true,
                    group,
                    type
                });
            }
        }
        else continue;
    }
    console.log(classList);
    return classList;
}

export { parseCalendarInput };
