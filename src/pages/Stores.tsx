import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { CategoriesResponse, Category } from "../types/categories";
import CategoriesList from "../components/stores/CategoriesList";
import StoresList from "../components/stores/StoresList";
import { Store, StoresResponse } from "../types/stores";
import StoresLayoutToggle from "../components/stores/StoresLayoutToggle";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";

function Stores() {
    const { t } = useTranslation(undefined, { keyPrefix: 'stores' });
    const [searchParams, setSearchParams] = useSearchParams();
    const [layout, setLayout] = useState<"list" | "grid">("grid");

    const stores = useQuery({
        queryKey: ["stores", searchParams.getAll("categories[]")],
        queryFn: () => {
            const url = "/client/stores";
            const categories = searchParams.getAll("categories[]").map(c => "categories[]=" + c).join("&");
            return axiosInstance.get<StoresResponse>(url + "?" + categories);
        },
        select: (response) => response.data.data.stores,
    });
    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: () => axiosInstance.get<CategoriesResponse>("/client/categories"),
        select: (response) => response.data.data.categories
    });

    const onLayoutChange = (layout: "list" | "grid") => {
        setLayout(layout);
    };

    const onSelectCategory = (categoryId: number) => {
            // @ts-ignore
        setSearchParams(params => {
            let categories = params.getAll("categories[]").map(Number);
            if (categories.includes(categoryId)) {
                categories = categories.filter(c => c !== categoryId);
            } else {
                categories = [...categories, categoryId];
            }

            params.delete('categories[]');
            return categories.map(c => ["categories[]", c]);
        });
    };

    return (
        <main className="p-6 bg-gray-50">
            <div>
                <CategoriesList 
                    categories={categories?.data || []} 
                    selectedCategories={searchParams.getAll("categories[]").map(Number)}
                    onSelectCategory={onSelectCategory} 
                />
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-2 items-center mb-4">
                    <div>
                        {
                            stores.isFetched ? (
                                <h2 className="font-bold text-lg">{t("title", {numberOfStores: stores.data!.length})}</h2>
                            ) : (
                                <div className="skeleton h-[28px] w-[160px]"></div> 
                            )
                        }
                    </div>
                    <div className="text-end">
                        <StoresLayoutToggle 
                            layout={layout}
                            onLayoutChange={onLayoutChange}
                        />
                    </div>
                </div>
                <StoresList stores={stores?.data || []} isFetched={stores.isFetched} layout={layout} />
            </div>
        </main>
    );
}

export default Stores;