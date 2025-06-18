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
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";

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
        <Container
            disableGutters
            sx={{ bgcolor: 'background.default' }}
            maxWidth={false}
        >
            <Container>
                <Box>
                    <CategoriesList
                        categories={categories?.data || []}
                        selectedCategories={searchParams.getAll("categories[]").map(Number)}
                        onSelectCategory={onSelectCategory}
                    />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Grid container alignItems={"center"} sx={{ mb: 4 }}>
                        <Grid size={6}>
                            {
                                stores.isFetched ? (
                                    <Typography>{t("title", { numberOfStores: stores.data!.length })}</Typography>
                                ) : (
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={160} />
                                )
                            }
                        </Grid>
                        <Grid size={6} sx={{ display: "flex" }} justifyContent="end">
                            <StoresLayoutToggle
                                layout={layout}
                                onLayoutChange={onLayoutChange}
                            />
                        </Grid>
                    </Grid>
                    <StoresList stores={stores?.data || []} isFetched={stores.isFetched} layout={layout} />
                </Box>
            </Container>
        </Container>
    );
}

export default Stores;