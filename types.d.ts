export interface Category {
    id: string;
    name: string;
    description: string;
}

export type ApiCategory = Omit<Category, 'description'>;

export interface Place {
    id: string;
    name: string;
    description: string;
}

export interface Item {
    id: string;
    category_id: string;
    place_id: string;
    name: string;
    description: string;
    image: string;
}

export interface Shop {
    categories: Category[],
    places: Place[],
    items: Item[],
}