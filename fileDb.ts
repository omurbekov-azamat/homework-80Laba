import {Category, Shop} from "./types";
import {promises as fs} from "fs";

const filename = './db.json';
let data: Shop = {
    categories: [],
    places: [],
    items: [],
};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = {
                categories: [],
                places: [],
                items: [],
            }
        }
    },
    async addCategory(category: Category) {
        data.categories.push(category);
        await this.save();
        return category;
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    },
};

export default fileDb;