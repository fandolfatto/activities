import express from 'express'
const app = express()
const port = process.env.PORT || 3000

import {activitiesRouter} from './routes/activities.js'

//le serveur Express comprend que les données sont envoyées en JSON dans le corps de la requête (req.body)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
