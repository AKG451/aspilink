import 'dotenv/config';
// ...existing code...
import express from 'express';
import bodyParser from 'body-parser';
import { setRoutes } from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});