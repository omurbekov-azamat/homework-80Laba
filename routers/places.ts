import express from 'express';
import {ApiPlace, Place} from "../types";
import {randomUUID} from "crypto";
import fileDb from "../fileDb";

const placesRouter = express.Router();

placesRouter.post('/', async (req, res) => {
   if (!req.body.name) {
       return res.status(400).send({error: 'Name field is required'});
   }

   const placeData: Place = {
       id: randomUUID(),
       name: req.body.name,
       description: req.body.description,
   };

   const savePlace = await fileDb.addPlace(placeData);

   res.send(savePlace);
});

placesRouter.get('/', async (req, res) => {
   const places = await fileDb.getPlaces();

   if (!places) {
       return res.sendStatus(404);
   }

   const clearPlaces: ApiPlace[] = places.map((place) => {
       return {
           id: place.id,
           name: place.name,
       }
   });
   res.send(clearPlaces);
});

placesRouter.get('/:id', async (req, res) => {
    const places = await fileDb.getPlaces();
    const place = places.find(place => place.id === req.params.id);

    if (!place) {
        return res.sendStatus(404);
    }

    res.send(place);
});

placesRouter.delete('/:id', async (req, res) => {
    const places = await fileDb.deletePlaceById(req.params.id);
    res.send(places);
});

export default placesRouter;