import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contact.js';
//import opportunityRoutes from './routes/opportunity.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/contact', contactRoutes);
//app.use('/api/opportunity', opportunityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Backend running on http://localhost:5000'));