import { Express } from 'express';

export function setRoutes(app: Express) {
    // Define your routes here
    app.get('/', (req, res) => {
        res.send('NTA Update Tracker API');
    });

    // Add more routes as needed
}