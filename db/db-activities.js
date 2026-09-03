import mysql from 'mysql2/promise';

const con = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "P@ssw0rd",
    port:3308,
    database: "app_activities",
});

const db = {

    getAllActivities: async () => {
        //the getAllActivities function waits until the query is finished to execute
        //if there is some code after the call of this function, it will be executed without waiting the execution of this function
        const [rows] = await con.execute('SELECT * FROM activities');
        return rows;
    },

    getActivityById: async ( id) => {
        const [rows] = await con.execute('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];
    },

    createActivity: async ( {name, date, duration}) => {
        const [result] = await con.execute(
            'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
            [name, date, duration]
        );
        return {id: result.insertId, name, date, duration};
    },

    updateActivity: async (id, {name, date, duration}) => {
        await con.execute(
            'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
            [name, date, duration, id]
        );
        return {id, name, date, duration};
    },

    deleteActivity: async (id) => {
        await con.execute('DELETE FROM activities WHERE id = ?', [id]);
        return {success: true};
    },
}

export { db }