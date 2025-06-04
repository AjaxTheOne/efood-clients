import { Category } from "../../types/categories";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
    categories: Category[];
    selectedCategories: number[];
    onSelectCategory: (categoryId: number) => void;
};

function CategoriesList({ categories, selectedCategories, onSelectCategory }: Props) {
    return (
        <>
            <div className="overflow-x-auto flex gap-3">
                {
                    categories.length ? (
                        categories.map(category =>
                            <div
                                className={
                                    "flex flex-col gap-2 items-center rounded-lg" + (selectedCategories.includes(category.id) ? " bg-gray-200" : "")
                                }
                                key={category.id}
                                onClick={() => onSelectCategory(category.id)}
                            >
                                <div style={{ width: "80px", height: "80px" }} >
                                    <img
                                        className="object-contain"
                                        src={category.icon} alt={category.name}
                                    />
                                </div>
                                <span className="text-xs text-gray-400">{category.name}</span>
                            </div>
                        )
                    ) : (
                        [1, 2, 3, 4, 5, 6, 7, 8].map(_ =>
                            <div className="flex flex-col gap-2 items-center" key={_}>
                                <div className="skeleton h-[80px] w-[80px]"></div>
                                <div className="skeleton h-[14px] w-[48px]"></div>
                            </div>
                        )
                    )
                }
            </div>
            {
                !!selectedCategories.length && (
                    <div className="overflow-x-auto flex gap-2 mt-4">
                        {
                            selectedCategories.map(category => (
                                <button key={category} className="btn btn-light btn-sm rounded-full" onClick={() => onSelectCategory(category)}>
                                    {categories.find(c => c.id === category)?.name}
                                    <XMarkIcon className="size-4"/>
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </>

    );
}

export default CategoriesList;