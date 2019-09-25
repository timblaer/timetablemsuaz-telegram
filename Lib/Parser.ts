import "./ParserStringExtension";

import ch from "cheerio";
import Lesson from "../Timetable/Lesson";
import WeekView from "../Timetable/WeekView";
import WeekInfo from "../Models/WeekInfo";

export default class Parser {

    static LoadString(body:string) {
        var $ = ch.load(body, {decodeEntities:false});
        return $;
    }

    static WeekList(body:string):Array<WeekInfo> {
        var $ = Parser.LoadString(body);
        var result:WeekInfo[] = [];
        $('select option').each(function(i, element) {
            result.push( new WeekInfo($(element).val(), $(element).html()));
        });
        return result;
    }

    static WeekView(body:string):WeekView {
        const $ = Parser.LoadString(body.replace("&nbsp;", ""));
        const table = $("td[class=c_top]");
        const table_notes = $('td[class="c_top c_right"]');

        const result: WeekView = new WeekView();
        let cur_lesson = new Lesson();

        table.each(function(i, element) {
            if(result.Empty) {
                return;
            }
            switch(i % 5) {
                case 2: {
                    cur_lesson.SaveRoom(($(element).html() || '').cleanStringArray(' '));
                    if(!cur_lesson.room.length) {
                        result.Empty = true;
                    }
                } break;

                case 3: {
                    cur_lesson.SaveSubject(($(element).html() || '').cleanStringArray(' '));
                    if(!cur_lesson.subject.length) {
                        result.Empty = true;
                    }
                } break;

                case 4: {
                    cur_lesson.SaveTeacherList(($(element).html() || '').cleanStringArray(' '));
                    if(!cur_lesson.teacherList.length) {
                        result.Empty = true;
                    }

                    cur_lesson.SaveNote(($(table_notes[Math.floor(i/5)]).html() || '').cleanStringArray(' '));
                    if(!cur_lesson.note.length) {
                        result.Empty = true;
                    }

                    result.SaveLesson(cur_lesson);
                    cur_lesson = new Lesson();
                } break;
            }
        });

        return result;
    }
}