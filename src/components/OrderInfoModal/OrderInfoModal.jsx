import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom"
import { Modal } from "../Modal/Modal"
import { OrderInfo } from "../OrderInfo/OrderInfo"
import PropTypes from "prop-types";

export const OrderInfoModal = ({closeModalOrderInfo}) =>{
    const {id} = useParams();
    const location = useLocation();
    const orders = useSelector(store=>store.wsAllOrders.orders);
    const userOrders = useSelector(store=>store.wsUserOrders.userOrders);
    let curOrder;

    if(location.state.background.pathname === '/feed'){
        curOrder = orders.find((el)=>el._id === id) 
    }
    else{
        curOrder = userOrders.find((el)=>el._id === id)
    }
    return (
        <Modal title={`#${curOrder.number}`} style='text text_type_digits-default' handleClose={closeModalOrderInfo}>
			<OrderInfo/>
		</Modal>
    )
}
OrderInfoModal.propTypes = {
    closeModalOrderInfo: PropTypes.func.isRequired,
};