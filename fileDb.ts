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
    async getCategories() {
        return data.categories;
    },
    async addCategory(category: Category) {
        data.categories.push(category);
        await this.save();
        return category;
    },
    async removeCategoryById(id: string) {
        await fs.unlink(filename);
        const product = data.categories.find(category => category.id === id);
        if (product) {
            data.categories = data.categories.filter((item: Category) => item.id !== id);
            await fs.writeFile(filename, JSON.stringify(data));
            return 'Deletion was successful';
        } else {
            await fs.writeFile(filename, JSON.stringify(data));
            return 'There is no category with that id';
        }
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    },
};

export default fileDb;