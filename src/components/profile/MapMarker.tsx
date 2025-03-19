export function MapMarker(props) {
    return (
        <img
            onClick={props.onClick}
            alt="Your Company"
            src="https://png.pngtree.com/png-clipart/20220131/original/pngtree-3d-pin-map-marker-location-front-view-png-image_7249831.png"
            className="h-10 w-auto"
        />
    )
}

export default MapMarker;