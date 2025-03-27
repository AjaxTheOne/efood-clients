import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

type Props = {
    quantity: number;
    onDecreaseQuantity: (event?) => void;
    onIncreaseQuantity: (event?) => void;
};

export function ProductQuantityControls({ quantity, onDecreaseQuantity, onIncreaseQuantity }: Props) {
    return (
        <div className="flex justify-between items-center gap-3">
            <button
                disabled={quantity === 0}
                className="btn btn-square btn-sm"
                onClick={onDecreaseQuantity}
            >
                <MinusIcon className="size-6" />
            </button>

            <span className="font-bold text-lg w-[25px] text-center">{quantity}</span>

            <button
                className="btn btn-square btn-sm"
                onClick={onIncreaseQuantity}
            >
                <PlusIcon className="size-6" />
            </button>
        </div>
    );
}