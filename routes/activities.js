import {activities} from "../db/mock-activities.js";
import express from "express";

const activitiesRouter = express.Router();

//let lstActivities = []
activitiesRouter.get('/', (req, res) => {
    res.json(activities)
})

//:id est un paramètre dynamique de l'URL
activitiesRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(value => value.id === id);
    res.json({activity});
});

export {activitiesRouter}