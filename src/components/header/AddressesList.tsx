import { Address } from "../../types/addresses";
import { MapPinIcon } from "@heroicons/react/24/solid";

type Props = {
    addresses: Address[];
    selectedAddress?: Address | null;
    onSelectAddress?: (address: Address) => void;
}

function AddressesList({ addresses, selectedAddress, onSelectAddress }: Props) {
    return (
        <fieldset className="-space-y-px rounded-md bg-white">
            {addresses.map((address) => (
                <label
                    key={address.id}
                    className="group flex cursor-pointer p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
                >
                    <input
                        defaultValue={address.id}
                        defaultChecked={selectedAddress?.id === address.id}
                        onChange={() => onSelectAddress?.(address)}
                        name="address"
                        type="radio"
                        className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <div className="ml-3 flex flex-col">
                        <span className="flex items-center gap-1 font-medium text-gray-900 group-has-checked:text-indigo-900">
                            <MapPinIcon className="size-5"/> {address.street} {address.number}
                        </span>
                        <span className="block text-xs text-gray-500 group-has-checked:text-indigo-700">
                            {address.city}, {address.postal_code}
                        </span>
                        {
                            address.floor ? (
                                <span className="block text-xs text-gray-500 group-has-checked:text-indigo-700">
                                    Floor: {address.floor}
                                </span>
                            ) : null
                        }
                    </div>
                </label>
            ))}
        </fieldset>
    );
}

export default AddressesList;