import express from 'express';
import {randomUUID} from "crypto";
import fileDb from "../fileDb";
import {Category} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'Name field is required'});
    }

    const categoryData: Category = {
        id: randomUUID(),
        name: req.body.name,
        description: req.body.description,
    };

    const saveCategory = await fileDb.addCategory(categoryData);

    res.send(saveCategory);
});

export default categoriesRouter;