import { Category } from "../../types/categories";

type Props = {
    categories: Category[];
};

function CategoriesList({ categories }: Props) {
    return (
        <div className="overflow-x-auto flex gap-3">
            {
                categories.length ? (
                    categories.map(category => 
                        <div className="flex flex-col gap-2 items-center" key={category.id}>
                            <div style={{width: "80px", height: "80px"}} >
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
    );
}

export default CategoriesList;