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

export type ApiPlace = Omit<Place, 'description'>;

export interface ApiItem {
    id: string;
    category_id: string;
    place_id: string;
    name: string;
}

export interface Item extends ApiItem{
    description: string;
    image: string | null;
}

export interface Shop {
    categories: Category[],
    places: Place[],
    items: Item[],
}