import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

function parseCalendarInput(input) {
    let line = input.split('\n');

    const lineCount = line.length;
    let classList = [];

    for (let i = 0; i < lineCount; i++) {
        let tokenizedLine = line[i].split('\t'); // each token is separated by \t (tab)

        if (tokenizedLine.length < 9) {
            continue; // missing token, skip current line
        }

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
            classList.push({
                signature: Base64.stringify(sha256(ID + day + month + time.join('') + room)),
                ID,
                name,
                day,
                month,
                time,
                room,
                selected: true,
                group,
                type
            });

            console.log(classList)
        }

        // final date, time and room
        date = tokenizedLine[6].trim().split('/');
        time = tokenizedLine[7].trim().match(/\d+/g);
        room = tokenizedLine[8].trim();

        day = date[0].trim();
        month = date[1].trim();

        if (day !== '' && month !== '' && time !== '' && room !== '--') {
            let type = 1;
            classList.push({
                signature: Base64.stringify(sha256(ID + day + month + time.join('') + room)),
                ID,
                name,
                day,
                month,
                time,
                room,
                selected: true,
                group,
                type
            });

            console.log(classList)
        }
    }
    return classList;
}

export { parseCalendarInput };
