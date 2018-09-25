const isEmpty = require('lodash/isEmpty');
const Bot = require('node-telegram-bot-api');

const utils = require('./utils.js');

const main = require('./requests/main');
const $_ = require('./consts');

const groupsList = require('./groups-list.json');
const groupsDetails = require('./groups-details.json');
const resStrs = require('./result-strings.json');

const users = {};
//chatId: {group, week, inProcess}

const actualWeekListBtns = [];

const { USERNAME, PASSWORD } = process.env;

const facultiesNumbers = {
    [$_.F_PHILOLOGY]: $_.F_PHILOLOGY_N, 
    [$_.F_MATHS]: $_.F_MATHS_N, 
    [$_.F_ECONOMICS]: $_.F_ECONOMICS_N,
    [$_.F_MANAGEMENT]: $_.F_MANAGEMENT_N, 
    [$_.F_CHEMISTRY]: $_.F_CHEMISTRY_N, 
    [$_.F_PHYSICS]: $_.F_PHYSICS_N,
    [$_.F_PSYCHOLOGY]: $_.F_PSYCHOLOGY_N
};

const cancelBtn = [$_.BTN_CANCEL];
const okBtn = [$_.BTN_OK];

const TG_TOKEN = process.env.TG_TOKEN;
const facultiesKeyboard = [
    [$_.F_PHILOLOGY, $_.F_MATHS, $_.F_ECONOMICS],
    [$_.F_MANAGEMENT, $_.F_CHEMISTRY, $_.F_PHYSICS],
    [$_.F_PSYCHOLOGY]
];

const bot = new Bot(TG_TOKEN, {polling: true});

const getWeeklistBtns = (chatId) => {
    const group = groupsDetails[users[chatId].group];

    if(actualWeekListBtns.length === 0) {
        // console.log("First time");
        return main({username: USERNAME, password: PASSWORD}, $_.OPTION_WEEKLIST, {
            prof_id: group.profId,
            course_id: group.courseId,
        }).then(data => {
            actualWeekListBtns.push(...data.parsed.map(entry => [entry.weekTitle]));
            actualWeekListBtns.shift();

            return actualWeekListBtns;
        });
    }
    // console.log("nth time");

    return Promise.resolve(actualWeekListBtns);
};

const selectFaculty = (chatId) => bot.sendMessage(chatId, resStrs.faculty, {
    reply_markup: {
        keyboard: facultiesKeyboard, 
        one_time_keyboard: true
    }
});

const selectGroup = (chatId, facultyNumber) => bot.sendMessage(chatId, resStrs.group, {
    reply_markup: {
        keyboard: [...groupsList[facultyNumber], cancelBtn], 
        one_time_keyboard: true
    }
});

const selectWeekDefault = (chatId) => bot.sendMessage(chatId, resStrs.week, {
    reply_markup: {
        keyboard: [[utils.calculateWeek()], [utils.calculateWeek(1)], [$_.BTN_ALL_WEEKS, ...cancelBtn]],
        one_time_keyboard: true
    }
});

const selectWeekAll = (chatId) => {
    return getWeeklistBtns(chatId).then(list => {
        bot.sendMessage(chatId, resStrs.week, {
            reply_markup: {
                keyboard: [...list, cancelBtn],
                one_time_keyboard: true
            }
        })
    })
}

const informAboutPreparation = (chatId) => bot.sendMessage(chatId, `${resStrs.prepInfoPrefix} / ${users[chatId].group} (${users[chatId].week})`, {
        reply_markup: {
            keyboard: [okBtn, cancelBtn],
            one_time_keyboard: true,
            resize_keyboard: false
        }
});

const sendWeekview = (chatId) => {
    const user = users[chatId];
    const weekTitle = user.week;
    const group = groupsDetails[user.group];

    user.inProcess = true;

    informAboutPreparation(chatId);
    return main({username: USERNAME, password: PASSWORD}, $_.OPTION_WEEKLIST, {
        prof_id: group.profId,
        course_id: group.courseId,
    }).then(data => {
        const cookie = data.cookie;
        const parsed = data.parsed;
        const week = parsed.find(x => x.weekTitle === weekTitle);
        if(week === undefined) {
            bot.sendMessage(chatId, resStrs.tableNotFound);
            delete users[chatId];
            selectFaculty(chatId);

            return null;
        }

        const weekId = week.weekId;

        return main({username: USERNAME, password: PASSWORD}, $_.OPTION_WEEKVIEW, {
            prof_id: group.profId,
            course_id: group.courseId,
            week_id: weekId
        }, cookie)
    }).then(data => {
        if(data === null) {
            return;
        }

        let freeDays = 0;
        
        const parsed = data.parsed;
        if(parsed.error === 'empty_table') {
            if(user.inProcess) {
                bot.sendMessage(chatId, resStrs.empty_table, {parse_mode: "Markdown"});
            }

            return selectFaculty(chatId);
        }

        const text = parsed.map((day, i) => {
            const oneDay = day.map((lesson, i) => {
                const index = resStrs.emojiNums[i];

                const room = lesson.room.join(', ');
                const note = lesson.note.length === 0 ? '' : '`🚨 ' + lesson.note.join(' ') + '`\n';
                const subject = `${lesson.subject.join(' ')}`;
                const teachers = `${lesson.teacherList.join(', ')}`;

                const text = ` _${room}_ \n 📚 ${subject} \n _💫 ${teachers}_ \n ${note}`;
                if((room + note + subject).length === 0) {
                    return '';
                }

                return `${index} ${text} \n`;
            }).join('');

            if(oneDay.length === 0) {
                freeDays++;
                return `📌 *${resStrs.days[i]}* \n 🌅 ${resStrs.freeDay} \n`;
            }

            return `📌 *${resStrs.days[i]}* \n ${oneDay}`;
        }).join('\n');

        const toSend = `${text}${freeDays == 6 ? resStrs.empty_table : ''}`;

        //if user is still in process, then send
        if(user.inProcess) {
            bot.sendMessage(chatId, toSend, {parse_mode: 'Markdown'});
            return selectFaculty(chatId);
        }

        delete users[chatId];
    });
}

const safeSelect = (chatId, selectFn) => users[chatId] === undefined ? selectFaculty : selectFn;

bot.on('message', (msg) => {
    console.log("> > > ", msg.text);
    
    const thisWeek = utils.calculateWeek();
    const chatId = msg.chat.id;

    if(msg.text == $_.BTN_OK) {
        return bot.sendMessage(chatId, '✨');
    }

    if(msg.text == $_.BTN_CANCEL) {
        const user = users[chatId];

        if(user !== undefined) {
            if(user.inProcess) {
                user.inProcess = false;
            } else {
                delete users[chatId];
            }
        }
        return selectFaculty(chatId);
    }

    if(msg.text == '/start' || msg.text == $_.BTN_CANCEL) {
        return safeSelect(chatId, selectFaculty)(chatId);
    }

    const facultyNumber = facultiesNumbers[msg.text];
    if(facultyNumber !== undefined) {
        users[chatId] = {};
        return safeSelect(chatId, selectGroup)(chatId, facultyNumber);
    }

    const groupDetails = groupsDetails[msg.text];
    if(groupDetails !== undefined) {
        users[chatId].group = msg.text;
        return safeSelect(chatId, selectWeekDefault)(chatId);
    }

    if(msg.text == thisWeek) {
        users[chatId].week = thisWeek;
        return safeSelect(chatId, sendWeekview)(chatId);
    }

    if(msg.text == $_.BTN_ALL_WEEKS) {
        bot.sendMessage(chatId, resStrs.oneSecondPlease, {
            reply_markup: {
                keyboard: [cancelBtn],
                one_time_keyboard: true
            }
        });
        return safeSelect(chatId, selectWeekAll)(chatId)
    }

    if(msg.text.match(utils.weekRegex).length !== 0) {
        users[chatId].week = msg.text;
        return safeSelect(chatId, sendWeekview)(chatId);
    }
});