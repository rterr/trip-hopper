import * as server from './server/index';
import * as client from './client/index';
var dotenv = require('dotenv');
dotenv.load();
export {
    server,
    client
};
