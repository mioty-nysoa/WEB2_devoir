import express,{type Express,type Request,type Response} from 'express';

const app:Express = express();
const port = 3000;

app.get('/hello', (req:Request, res:Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}/hello`);
});