//import {activities} from "../db/mock-activities.js";
import express from "express";
import {getNewID} from "../utils/utils.js";
import { db } from "../db/db-activities.js";

// create a specific router for the activities, app.js won't be too big
const activitiesRouter = express.Router();

//let lstActivities = []
activitiesRouter.get('/', async (req, res) => {
    const activities = await db.getAllActivities();
    res.json(activities)
})

activitiesRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const activity = await db.getActivityById(id);
    res.json({activity});
});

activitiesRouter.post('/create', async (req, res) => {
    const newActivity = await db.createActivity(req.body);
    const message = `L'activité ${newActivity.name} a bien été créée !`;
    res.json({message : message, activity : newActivity});
    //res.send('new activity successfully added')
})

activitiesRouter.put('/:id', async (req, res) => {
    const updateActivity = await db.updateActivity(req.params.id, req.body);
    res.json({ message: 'activity updated', updateActivity : updateActivity });
});

activitiesRouter.delete('/:id', async (req, res) => {
    let deletedActivity = await db.deleteActivity(req.params.id);
    res.json({ message: 'Activity deleted' });
});

export {activitiesRouter}