export type ProductCategory = {
    id: number;
    name: string;
    products?: Product[];
}

export type Product = {
    id: number;
    description: string;
    mainImage: string;
    name: string;
    price: string;
};