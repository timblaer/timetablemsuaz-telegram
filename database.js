const STAT_USERS  = "users";
const STAT_GROUPS = "groups";
const STAT_INFOS = "infos";

const {DB_CREDS, DB_URL, DB_NAME} = process.env;

const Mongoose = require('mongoose');
Mongoose.connect(`mongodb://${DB_CREDS}@${DB_URL}/${DB_NAME}?authSource=${DB_NAME}`);

const db = Mongoose.connection;
db.on('error', (err) => console.log("[DB] CONNECTION ERROR"));
db.once('open', () => console.log("[DB] CONNECTED"));

const Users = Mongoose.model('User', new Mongoose.Schema({
    chatId: String
}));

const Groups = Mongoose.model('Group', new Mongoose.Schema({
    groupId: String
}));

const Infos = Mongoose.model('Info', new Mongoose.Schema({
    info: String,
    type: {
       type: String,
       enum: ["query", "admin"] 
    }
}));

const Events = Mongoose.model('Event', new Mongoose.Schema({
    title: String,
    date: Date,
    type: {
        type: String,
        enum: ['e', 'f', 'v', 'b', 'c', 'o'], //events, football, volleyball, basketball, chgk, other
    },
    place: String,
    addedBy: String
}));


async function save(type, data) {
    try {
        if(type === STAT_USERS) {
            await Users.findOneAndUpdate(data, data, {upsert: true});
        } else if(type === STAT_GROUPS) {
            await Groups.findOneAndUpdate(data, data, {upsert: true});
        } else if(type === STAT_INFOS) {
            await Infos.create(data);
        }
    } catch(err) {
        console.log("[DB] SAVE ERROR: ", type, err);
    }
}

async function get() {
    try {
        const userCount = Users.countDocuments({});
        const groupCount = Groups.countDocuments({});

        return `*Пользователей:* ${await userCount}\n*Групп:* ${await groupCount}`;
    } catch(err) {
        return "Не удалось подключиться к базе"
    }
}

module.exports = {
    stats: {save, get, STAT_USERS, STAT_GROUPS, STAT_INFOS},
    models: {Users, Groups, Infos, Events}
};