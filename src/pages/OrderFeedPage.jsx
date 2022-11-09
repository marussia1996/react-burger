import { OrderFeed } from "../components/OrderFeed/OrderFeed";
import PropTypes from "prop-types";

export function OrderFeedPage({openModalOrderInfo}) {
    return (
        <OrderFeed openModalOrderInfo={openModalOrderInfo}/>
    )
}
OrderFeedPage.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};