import { OrderFeed } from "../components/OrderFeed/OrderFeed";
import { FC } from "react";
type TOrderFeedPageProps = {
    openModalOrderInfo: ()=>void;
}
export const OrderFeedPage:FC<TOrderFeedPageProps> = ({openModalOrderInfo}) => {
    return (
        <OrderFeed openModalOrderInfo={openModalOrderInfo}/>
    )
}