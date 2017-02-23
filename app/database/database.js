var Datastore = require('nedb')
let db = {};
db.users = new Datastore('./users.db');
//db.robots = new Datastore('./robots.db');
export default db;
