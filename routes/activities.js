import {activities} from "../db/mock-activities.js";
import express from "express";
import {getNewID} from "../utils/utils.js";

const activitiesRouter = express.Router();

//let lstActivities = []
activitiesRouter.get('/', (req, res) => {
    res.json(activities)
})

activitiesRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(value => value.id === id);
    res.json({activity});
});

activitiesRouter.post('/create', (req, res) => {
    const {name, date, duration} = req.body;
    const id = getNewID(activities);
    const newActivity={id, name, date, duration};
    activities.push(newActivity);
    const message = `L'activité ${newActivity.name} a bien été créée !`;
    res.json({message : message, activity : newActivity});
    //res.send('new activity successfully added')
})

activitiesRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, date, duration } = req.body;
    const index = activities.findIndex(activity => activity.id === id);
    activities[index] = { id, name, date, duration };
    res.json({ message: 'activity updated', activity: activities[index] });
});

activitiesRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = activities.findIndex(activity => activity.id === id);
    //res.send(index);
    activities.splice(index, 1);
    res.json({ message: 'Activity deleted' });
});

export {activitiesRouter}