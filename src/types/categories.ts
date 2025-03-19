import { BaseResponse } from "./helpers";

export type Category = {
    id: number;
    name: string;
    icon: string;
};

export type CategoriesResponse = BaseResponse<{
    categories: Category[];
}>;