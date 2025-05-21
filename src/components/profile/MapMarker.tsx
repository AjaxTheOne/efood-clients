export function MapMarker(props) {
    return (
        <img
            onClick={props.onClick}
            src={props.image}
            className="h-10 w-auto"
        />
    )
}

export default MapMarker;