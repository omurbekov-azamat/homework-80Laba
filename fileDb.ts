import {Category, Place, Shop} from "./types";
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
    async getCategories() {
        return data.categories;
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
    async addPlace(place: Place) {
        data.places.push(place);
        await this.save();
        return place;
    },
    async getPlaces() {
      return data.places;
    },
    async deletePlaceById(id: string) {
        await fs.unlink(filename);
        const place = data.places.find(place => place.id === id);
        if (place) {
            data.places = data.places.filter((item: Place) => item.id !== id);
            await fs.writeFile(filename, JSON.stringify(data));
            return 'Deletion place was successful';
        } else {
            await fs.writeFile(filename, JSON.stringify(data));
            return 'There is no place with that id';
        }
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    },
};

export default fileDb;