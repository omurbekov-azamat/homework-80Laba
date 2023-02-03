import express from "express";
import {ApiItem, Item} from "../types";
import {randomUUID} from "crypto";
import {imageUpload} from "../multer";
import fileDb from "../fileDb";

const itemsRouters = express.Router();

itemsRouters.post('/', imageUpload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.category_id || !req.body.place_id) {
        return res.status(400).send({error: 'All fields are required'});
    }

    const itemData: Item = {
        id: randomUUID(),
        category_id: req.body.category_id,
        place_id: req.body.place_id,
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    }

    const saveItem = await fileDb.addItem(itemData);

    res.send(saveItem);
});

itemsRouters.get('/', async (req, res) => {
    const items = await fileDb.getItems();

    if (!items) {
        return res.sendStatus(404);
    }

    const clearItems: ApiItem[] = items.map((item) => {
        return {
            id: item.id,
            category_id: item.category_id,
            place_id: item.place_id ,
            name: item.name,
        }
    });
    res.send(clearItems);
});

itemsRouters.get('/:id', async (req, res) => {
    const items = await fileDb.getItems();
    const item = items.find(item => item.id === req.params.id);

    if (!item) {
        return res.status(404).send({error: 'Wrong id, there is no item by that id!'});
    }

    res.send(item);
});

itemsRouters.delete('/:id', async (req, res) => {
    const items = await fileDb.deleteItemById(req.params.id);
    res.send(items);
});


export default itemsRouters;