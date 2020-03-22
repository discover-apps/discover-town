import knex from 'knex';
import {MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER} from "../../util/secrets";

export const database = knex({
    client: 'mysql',
    connection: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        typeCast: function (field: any, next: any) {
            if (field.type == 'TINY' && field.length == 4) {
                return field.string() == '1';
            }
            if (field.type == 'DATETIME') {
                return new Date(field.string());
            }
            return next();
        }
    }
});