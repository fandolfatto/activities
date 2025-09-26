import express from "express";
import { db } from "../db/db-activities.js";
import {isValidId, checkData} from "../helper.mjs";

// create a specific router for the activities, app.js won't be too big
const activitiesRouter = express.Router();


/**
 * @openapi
 * /api/activities:
 *   get:
 *     summary: returns a list of activities.
 *     description: get all activities in the CPNV
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *              type: string
 *              description: name of the activity
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *              type: integer
 *              description: number of activities returned
 *     responses:
 *       200:
 *         description: Returns an array of activities.
 *         content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/activity"
 *       500:
 *         description: system exception describing the error.
 */
activitiesRouter.get('/', async (req, res) => {
    try {
        const name = req.query.name;
        let limit;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        } else {
            limit = null;
        }

        let activities;
        if (name) {
            if (name.length <= 2) {
                return res.status(400).json({ error: "Le paramètre de recherche doit contenir au moins 3 caractères." });
            } else {
                activities = await db.getActivitiesByName(name, limit);
            }
        } else {
            activities = await db.getAllActivities(limit);
        }
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

/**
 * @openapi
 * /api/activities/create:
 *   post:
 *     summary: returns a list of activities.
 *     description: get all activities in the CPNV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newactivity'
 *     responses:
 *       200:
 *         description: Returns an array of activities.
 *         content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/activity"
 *       400:
 *         description: incorrect values
 *       500:
 *         description: system exception describing the error.
 */
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