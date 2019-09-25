const Database  = require('./database.js');
const Admin     = require('./admin.js');
const Editor    = require('./editor.js');
const Custom    = require('./custom.js');
const Subscriptions = require('./subscriptions');

const isEmpty = require('lodash/isEmpty');
const Bot     = require('node-telegram-bot-api');

const utils = require('./Lib/utils.js');
const main  = require('./requests/main');		
const $_    = require('./consts');

const groupsList    = require('./groups-list.json');
const groupsDetails = require('./groups-details.json');
const resStrs       = require('./result-strings.json');

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
const mainSelectKeyboard = [
    [$_.F_PHILOLOGY, $_.F_MATHS, $_.F_ECONOMICS],
    [$_.F_MANAGEMENT, $_.F_CHEMISTRY, $_.F_PHYSICS],
    [$_.F_PSYCHOLOGY, $_.S_BUSES],
    [$_.S_EVENTS, $_.S_SPORTS, $_.S_CHGK, $_.S_INFO]
];

const facultyKeyboardSettings = {
    reply_markup: {
        keyboard: mainSelectKeyboard,
        one_time_keyboard: true
    }
};

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

const mainSelectScreen = (chatId) => bot.sendMessage(chatId, resStrs.main, facultyKeyboardSettings);

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

const informAboutPreparation = (chatId) => bot.sendMessage(chatId, `${resStrs.prepInfoPrefix} / ${!isEmpty(users[chatId].group) ? users[chatId].group :  "N/A"} (${users[chatId].week})`, {
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
            mainSelectScreen(chatId);

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
                bot.sendMessage(chatId, resStrs.empty_table, {
                    parse_mode: "Markdown",
                    ...facultyKeyboardSettings
                });
            }

            return;
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
            return bot.sendMessage(chatId, toSend, {
                parse_mode: 'Markdown',
                ...facultyKeyboardSettings
            });
        }

        delete users[chatId];
    });
}
const safeSelect = (chatId, selectFn) => users[chatId] === undefined ? mainSelectScreen : selectFn;

bot.on('message', async (msg) => {
    // console.log("> > > ", msg.text);
    const thisWeek = utils.calculateWeek();
    const chatId = msg.chat.id;

    try {
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
            return mainSelectScreen(chatId);
        }

        if(msg.text == $_.S_INFO) {
            return await bot.sendMessage(chatId, resStrs.info, {
                parse_mode: "Markdown",
                ...facultyKeyboardSettings
            })
        }

        if(msg.text == $_.S_EVENTS) {
            const events = await Custom.getComplex($_.EVENTS_TYPES);
            return bot.sendMessage(chatId, Custom.prettyPrint(events), {
                parse_mode: 'Markdown',
                ...facultyKeyboardSettings
            });
        }

        if(msg.text == $_.S_SPORTS) {
            const events = await Custom.getComplex($_.SPORTS_TYPES);
            return bot.sendMessage(chatId, Custom.prettyPrint(events), {
                parse_mode: 'Markdown',
                ...facultyKeyboardSettings
            });
        }

        if(msg.text == $_.S_CHGK) {
            const events = await Custom.getSimple($_.CHGK_TYPE);
            return bot.sendMessage(chatId, Custom.prettyPrint(events), {
                parse_mode: 'Markdown',
                ...facultyKeyboardSettings
            });
        }

        const isSubscription = await Subscriptions.handle(bot, chatId, msg.text, {
            parse_mode: 'Markdown',
            ...facultyKeyboardSettings
        });

        if(isSubscription) {
            return;
        }

        const isEditor = await Editor.handle(bot, chatId, msg.text, {
            parse_mode: 'Markdown',
            ...facultyKeyboardSettings
        });

        if(isEditor) {
            return bot.sendMessage(chatId, resStrs.main, facultyKeyboardSettings);
        }

        if(msg.text == '/start' || msg.text == $_.BTN_CANCEL) {
            return safeSelect(chatId, mainSelectScreen)(chatId);
        }

        if(msg.text === $_.S_BUSES) {
            await Database.stats.save(Database.stats.STAT_INFOS, {info: "bus", type: "query"});
            return await bot.sendMessage(chatId, resStrs.busSchedule, {
                parse_mode: "Markdown",
                ...facultyKeyboardSettings
            });
        }

        const facultyNumber = facultiesNumbers[msg.text];
        if(facultyNumber !== undefined) {
            Database.stats.save(Database.stats.STAT_USERS, {chatId});

            users[chatId] = {};
            return safeSelect(chatId, selectGroup)(chatId, facultyNumber);
        }

        const groupDetails = groupsDetails[msg.text];
        if(groupDetails !== undefined) {
            Database.stats.save(Database.stats.STAT_GROUPS, {groupId: msg.text});

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

        const matchWeek = msg.text.match(utils.weekRegex);
        if(!isEmpty(matchWeek)) {
            users[chatId].week = msg.text;

            console.log(users[chatId]);
            return safeSelect(chatId, sendWeekview)(chatId);
        }

        const isAdmin = await Admin.handle(bot, chatId, msg.text);
        if(!isAdmin) {
            await bot.sendMessage(chatId, resStrs.badMessage, facultyKeyboardSettings);
        } else {
            mainSelectScreen(chatId);
        }
    } catch(e) {
        delete users[chatId];
        console.log(e);
        await bot.sendMessage(chatId, resStrs.error, {
            parse_mode: "Markdown",
            reply_markup: {
                keyboard: mainSelectKeyboard, 
                one_time_keyboard: true
            }
        });
    }
});