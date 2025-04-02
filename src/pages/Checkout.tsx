import { useParams } from "react-router";

function Checkout() {
    const params = useParams();

    return "Checkout" + params.id;
}

export default Checkout;