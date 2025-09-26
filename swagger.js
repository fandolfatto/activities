import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestion des activités au CPNV',
            description: 'API REST pour chercher, ajouter, mettre à jour, supprimer des activités spéciales réalisées au CPNV',
            version: '1.0.0',
        },
        servers : [
            {
                url : 'http://localhost:3000/',
            },
        ],
        "components":
        {
            "schemas":
            {
                "activity":
                {
                    "properties":
                    {
                        "id": { "type": "integer", "example" :1, "description":"id de l'activité" },
                        "name": { "type": "string", "example" :"sortie neige", "description" : "nom de l'activité"  },
                        "activity_date" : { "type": "date", "example" :"2025.09.24", "description" : "date de l'activité"  },
                        "duration" : {"type": "integer", "example" :"8", "description" : "durée de l'activité (en heures)" }
                    },
                },
                "newactivity":
                {
                    "properties":
                        {
                            "name": { "type": "string", "example" :"sortie neige", "description" : "nom de l'activité"  },
                            "activity_date" : { "type": "date", "example" :"2025.09.24", "description" : "date de l'activité"  },
                            "duration" : {"type": "integer", "example" :"8", "description" : "durée de l'activité (en heures)" }
                        },
                },
            },
        }
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};