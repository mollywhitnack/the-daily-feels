import { Router } from 'express';
import Articles from '../db/Articles';

const router = Router();

router.get('/:searchTerm', (req, res) => {
  Articles.get(req.params.searchTerm)

    .then(articlesToSend => {
      console.log('routes 10', articlesToSend);
      res.send(articlesToSend)
    })
    .catch(err => res.status(400).send(err));

});

export default router;

