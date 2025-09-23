//import {activities} from "../db/mock-activities.js";
import express from "express";
import {getNewID} from "../utils/utils.js";
import { db } from "../db/db-activities.js";
import {isValidId, checkData} from "../helper.mjs";
import {activities} from "../db/mock-activities.js";

// create a specific router for the activities, app.js won't be too big
const activitiesRouter = express.Router();

activitiesRouter.get('/', async (req, res) => {
    try {
        const activities = await db.getAllActivities();
        res.json(activities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

activitiesRouter.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!isValidId(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        const activity = await db.getActivityById(id);
        if (activity === undefined) {
            res.status(404).json({error: "Activitée non trouvée"});
        } else {
            res.json({activity});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

activitiesRouter.post('/create', async (req, res) => {
    try {
        checkData(req.body)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
    try {
        const newActivity = await db.createActivity(req.body);
        const message = `L'activité ${newActivity.name} a bien été créée !`;
        res.json({message: message, activity: newActivity});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

activitiesRouter.put('/:id', async (req, res) => {
    try {
        checkData(req.body)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
    try {
        const resUpdateActivitiesNb = await db.updateActivity(req.params.id, req.body);
        if (resUpdateActivitiesNb === 0) {
            res.status(404).json({error: "Activitée non trouvée"});
        } else {
            const activityUpdated = await db.getActivityById(req.params.id);
            res.json({message: 'Activity updated', updateActivity : {activityUpdated}});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
});

activitiesRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        let deletedActivity = await db.deleteActivity(req.params.id);
        if (deletedActivity.success) {
            res.json({message: 'Activity deleted'});
        } else {
            res.status(404).json({error: "Activitée non trouvée."});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



export {activitiesRouter}