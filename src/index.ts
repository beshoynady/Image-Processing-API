import express from 'express';
import routes from './routes/indexroute';

const app = express();
const port = 3000;

app.use('/image', routes);

app.get('/', (req: express.Request, res: express.Response): void => {
   res.send('Hi in the API page');
});

app.listen(port, () => {
   console.log(`server started at http://localhost:${port}`);
});

export default app;
