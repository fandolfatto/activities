import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P@ssw0rd",
    port:3308,
    database: "app_activities",
});

const db = {

    getAllActivities: async () => {
        const [rows] = await con.query('SELECT * FROM activities');
        return rows;
    },

    getActivityById: async ( id) => {
        const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];
    },

    createActivity: async ( {name, date, duration}) => {
        const [result] = await con.query(
            'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
            [name, date, duration]
        );
        return {id: result.insertId, name, date, duration};
    },

    updateActivity: async (id, {name, date, duration}) => {
        await con.query(
            'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
            [name, date, duration, id]
        );
        return {id, name, date, duration};
    },

    deleteActivity: async (id) => {
        await con.query('DELETE FROM activities WHERE id = ?', [id]);
        return {success: true};
    },
}

export { db }