import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props = {
    layout: "list" | "grid";
    onLayoutChange: (layout: "list" | "grid") => void;
};

function StoresLayoutToggle({ layout, onLayoutChange }: Props) {

    const changeLayout = (event, layout: "list" | "grid") => {
        onLayoutChange(layout);
    }

    return (
        <ToggleButtonGroup
            size="small"
            value={layout}
            exclusive
            onChange={changeLayout}
        >
            <ToggleButton value="list"><ListBulletIcon className="size-6"/></ToggleButton>
            <ToggleButton value="grid"><Squares2X2Icon className="size-6"/></ToggleButton>
        </ToggleButtonGroup>
    );
}

export default StoresLayoutToggle;