import express from 'express'
import swaggerUi from 'swagger-ui-express';
const app = express()
//const port = process.env.PORT || 3001
const port = 80

import {activitiesRouter} from './routes/activities.js'
import {openApiSpecification} from './swagger.js'

//le serveur Express comprend que les données sont envoyées en JSON dans le corps de la requête (req.body)
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, {explorer :true}));

//pour frontend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/', (req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

app.use('/api/activities', activitiesRouter);

// if no route exists
app.use((req, res) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
