import { UserOrders } from "../components/UserOrders/UserOrders";
import PropTypes from "prop-types";

export function UserOrdersPage({openModalOrderInfo}) {
    return (
        <UserOrders openModalOrderInfo={openModalOrderInfo}/>
    )
}
UserOrdersPage.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};