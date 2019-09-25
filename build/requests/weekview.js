const ch = require("cheerio");
const qs = require('querystring');

const $_ = require('../consts.js');
const go = require('./go.js');

const weeklist = require('./weeklist.js');

const MAX_LESSON_COUNT = 5;

const cleanString = (string, separator) => string
        .replace('\n', '')
        .split(separator)
        .map(
            x => x.replace(/<[^>]*>/g, "").trim()
        )
        .filter(
            str => str.length != 0
        );

const parseWV = ($, table, table_notes) => {
  const len = table.length;
  const result = [];

  var cur_day = [];

  var cur_lesson = {};
  var lesson_count = 0;

  var isEmpty = 1;

  table.each(function(i) {
    switch(i % 5) {
      case 2: {
        cur_lesson.room = cleanString($(this).html());
        if(cur_lesson.room.length) {
            isEmpty *= 0;
        }
      } break;

      case 3: {
        cur_lesson.subject = cleanString($(this).html());
        if(cur_lesson.subject.length) {
            isEmpty *= 0;
        }
      } break;

      case 4: {
        cur_lesson.teacherList = cleanString($(this).html());
        if(cur_lesson.teacherList.length) {
            isEmpty *= 0;
        }

        cur_lesson.note = cleanString(
            $(
                table_notes[Math.floor(i/5)]
            ).html()
        );
        if(cur_lesson.note.length) {
            isEmpty *= 0;
        }

        lesson_count++;
        cur_day.push(cur_lesson);
        cur_lesson = {};

        if(lesson_count == MAX_LESSON_COUNT) {
          result.push(cur_day);
          cur_day = [];
          lesson_count = 0;
        }
      } break;
    }
  });

  return isEmpty ? {error: "empty_table"} : result;
}

//reqData = {prof_id, course_id, week_id}
const weekview = async (cookie, reqData) => {
    const { prof_id, course_id, week_id } = reqData;

    await weeklist(cookie, reqData); //need this to make cookie valid

    const step_1 = await go('post', 
        `${$_.HOST_NAME}/process.php`,
        cookie,
        qs.stringify({
            profid: prof_id,
            courseid: course_id,
            weekid: week_id,
            inf: "0"
        })
    );

    const body = await step_1.text();
    return Parser.WeekView(body).toString();
}

module.exports = weekview;