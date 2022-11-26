import express from 'express';
import resize from '../resize';

const routes = express.Router();

routes.get('/', resize, (req: express.Request, res: express.Response): void => {
   res.send(`Enter the image name, height and width to resize`);
});

export default routes;
