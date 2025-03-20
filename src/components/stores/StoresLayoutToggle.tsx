import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

type Props = {
    layout: "list" | "grid";
    onLayoutChange: (layout: "list" | "grid") => void;
};

function StoresLayoutToggle({ layout, onLayoutChange }: Props) {

    const changeLayout = (layout: "list" | "grid") => {
        onLayoutChange(layout);
    }

    return (
        <div className="p-[2px] rounded-xs bg-gray-200 flex inline-flex gap-1">
            <button 
                onClick={() => changeLayout("list")}
                className={`btn btn-square size-8 hover:bg-white ${layout !== 'list' ? 'bg-transparent' : ''}`}
            >
                <ListBulletIcon className="size-6"/>
            </button>
            <button 
                onClick={() => changeLayout("grid")}
                className={`btn btn-square size-8 hover:bg-white  ${layout !== 'grid' ? 'bg-transparent' : ''}`}
            >
                <Squares2X2Icon className="size-6"/>
            </button>
        </div>
    );
}

export default StoresLayoutToggle;