import { Address } from "../../types/addresses";
import { useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { BuildingOffice2Icon, PlusIcon } from '@heroicons/react/24/outline';
import GoogleMap, { LatLngBounds } from "google-maps-react-markers";
import MapMarker from "./MapMarker";
import AddressForm from "./AddressForm";

type Props = {
    addresses: Address[];
};

const center = {
    lat: 40.6449329,
    lng: 22.9416259,
};

function ProfileAddresses({ addresses }: Props) {
    const [open, setOpen] = useState(false);
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        setMapReady(true);
    };

    const onLocationChange = (options: {
        bounds: LatLngBounds;
        center: (number | undefined)[];
        zoom: number;
    }) => {
        console.log(options);
    };

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <div className="pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Addresses</h2>
                <div className="flex justify-end">
                    <button className="btn btn-success" onClick={() => setOpen(true)}>
                        <PlusIcon className="size-5" />
                        Add address
                    </button>
                </div>
            </div>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 lg:max-w-[90%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div>
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gray-100">
                                    <BuildingOffice2Icon aria-hidden="true" className="size-6 text-gray-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        New Address
                                    </DialogTitle>
                                    <div className="mt-2 hidden">
                                        <GoogleMap
                                            apiKey=""
                                            defaultCenter={center}
                                            defaultZoom={5}
                                            options={{}}
                                            mapMinHeight="400px"
                                            onGoogleApiLoaded={onGoogleApiLoaded}
                                            onChange={onLocationChange}
                                        >
                                            <MapMarker
                                                lat={center.lat}
                                                lng={center.lng}
                                                markerId={"address-location"}
                                                draggable={true}
                                            >
                                            </MapMarker>                                                
                                        </GoogleMap>
                                    </div>
                                    <div className="mt-2">
                                        <AddressForm onSubmit={onSubmit} loading={false}/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center btn btn-soft"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default ProfileAddresses;