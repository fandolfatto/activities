import mysql from 'mysql2/promise';

//I create a javascript literal object which contains methods, I will export it after having created it
const db = {

    connectToDB: async () => {
        return await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "P@ssw0rd",
            port: 3308,
            database: "app_activities",
        });
    },

    getAllActivities: async () => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllActivities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            const [rows] = await con.query('SELECT * FROM activities');
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }

    },

    getActivityById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    createActivity: async ( {name, activity_date, duration}) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.query(
                'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
                [name, activity_date, duration]
            );
            return {id: result.insertId, name, activity_date, duration};
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    updateActivity: async (id, {name, activity_date, duration}) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.query(
                'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
                [name, activity_date, duration, id]
            );
            //return {id, name, date, duration};
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    deleteActivity: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.query('DELETE FROM activities WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                return {success: true};
            } else {
                return {success: false};
            }
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    disconnectFromDatabase: async (connection) => {
        try {
            await connection.end();
            console.log('Déconnexion de la base de données réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion de la base de données :', error);
            throw error;
        }
    }
}

export { db }