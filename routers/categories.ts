import express from 'express';
import {randomUUID} from "crypto";
import fileDb from "../fileDb";
import {ApiCategory, Category} from "../types";

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

categoriesRouter.get('/', async (req, res) => {
    const categories = await fileDb.getCategories();

    if (!categories) {
        return res.sendStatus(404);
    }

    const clearCategory: ApiCategory[] = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
        }
    });
    res.send(clearCategory);
});

categoriesRouter.get('/:id', async (req, res) => {
    const categories = await fileDb.getCategories();
    const category = categories.find(category => category.id === req.params.id);

    if (!category) {
        return res.status(404).send({error: 'Wrong id, there is no category by that id!'});
    }
    res.send(category);
});

categoriesRouter.delete('/:id', async (req, res) => {
    const categories = await fileDb.removeCategoryById(req.params.id);
    res.send(categories);
});

export default categoriesRouter;