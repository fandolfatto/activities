import mysql from 'mysql2/promise';

process.loadEnvFile();

const poolConn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

//I create a javascript literal object which contains methods, I will export it after having created it
const db = {

    getAllActivities: async () => {
        try {
            //the getAllActivities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            const [rows] = await poolConn.execute('SELECT * FROM activities');
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getActivityById: async ( id) => {
        try {
            const [rows] = await poolConn.execute('SELECT * FROM activities WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    createActivity: async ( {name, activity_date, duration}) => {
        try {
            const [result] = await poolConn.execute(
                'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
                [name, activity_date, duration]
            );
            return {id: result.insertId, name, activity_date, duration};
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    updateActivity: async (id, {name, activity_date, duration}) => {
        try {
            const [result] = await poolConn.execute(
                'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
                [name, activity_date, duration, id]
            );
            //return {id, name, date, duration};
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    deleteActivity: async (id) => {
        try {
            const [result] = await poolConn.execute('DELETE FROM activities WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                return {success: true};
            } else {
                return {success: false};
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export { db }