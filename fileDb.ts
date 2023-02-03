import {Category, Item, Place, Shop} from "./types";
import {promises as fs} from "fs";
import path from "path";
import config from "./config";

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
    async getCategories() {
        return data.categories;
    },
    async removeCategoryById(id: string) {
        const product = data.categories.find(category => category.id === id);
        if (product) {
            await fs.unlink(filename);
            data.categories = data.categories.filter((category: Category) => category.id !== id);
            await fs.writeFile(filename, JSON.stringify(data));
            return 'Deletion was successful';
        } else {
            return 'There is no category with that id';
        }
    },
    async addPlace(place: Place) {
        data.places.push(place);
        await this.save();
        return place;
    },
    async getPlaces() {
        return data.places;
    },
    async deletePlaceById(id: string) {
        const place = data.places.find(place => place.id === id);
        if (place) {
            await fs.unlink(filename);
            data.places = data.places.filter((place: Place) => place.id !== id);
            await fs.writeFile(filename, JSON.stringify(data));
            return 'Deletion place was successful';
        } else {
            return 'There is no place with that id';
        }
    },
    async addItem(item: Item) {
        data.items.push(item);
        await this.save();
        return item;
    },
    async getItems() {
        return data.items;
    },
    async deleteItemById(id: string) {
        const item = data.items.find(item => item.id === id);

        if (item) {
            const category = data.categories.find(category => category.id === item.category_id);
            if (category === undefined) {

                const place = data.places.find(place => place.id === item.place_id);

                if (place === undefined) {

                    await fs.unlink(filename);
                    const destDir = path.join(config.publicPath + '/' + item.image);
                    await fs.unlink(destDir);
                    data.items = data.items.filter((item: Item) => item.id !== id);
                    await fs.writeFile(filename, JSON.stringify(data));
                    return {
                        message: 'Deletion item was successful',
                    }
                } else {
                    return {
                        error: 'There is a related place',
                    }
                }
            } else {
                return {
                    error: 'There is a related category',
                }
            }
        } else {
            return {
                error: 'Not found',
            }
        }
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    },
};

export default fileDb;