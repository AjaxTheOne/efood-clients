import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CategoriesResponse, Category } from "../types/categories";
import CategoriesList from "../components/stores/CategoriesList";
import StoresList from "../components/stores/StoresList";
import { Store } from "../types/stores";

function Stores() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        axiosInstance.get<CategoriesResponse>("/client/categories")
            .then(response => {
                if (!response.data.success) {
                    return;
                }

                setCategories(response.data.data.categories);
            });

        axiosInstance.get("/client/stores")
            .then(response => {
                if (!response.data.success) {
                    return;
                }
                
                setStores(response.data.data.stores);
            })
    }, []);

    return (
        <main>
            <div>
                <CategoriesList categories={categories} />
            </div>
            <div className="mt-4">
                <StoresList stores={stores} />
            </div>
        </main>
    );
}

export default Stores;