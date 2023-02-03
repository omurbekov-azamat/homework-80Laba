import express from "express";
import categoriesRouter from "./routers/categories";
import placesRouter from "./routers/places";
import fileDb from "./fileDb";
import itemsRouters from "./routers/items";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouters);

const run = async () => {
    await fileDb.save();
    await fileDb.init();
    app.listen(port, () => {
        console.log('we are live on ' + port);
    });
};

run().catch(console.error);

