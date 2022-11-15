import { FC } from "react";
import { UserOrders } from "../components/UserOrders/UserOrders";
type TUserOrdersPageProps ={
    openModalOrderInfo: ()=>void;
}
export const UserOrdersPage:FC<TUserOrdersPageProps> = ({openModalOrderInfo}) => {
    return (
        <UserOrders openModalOrderInfo={openModalOrderInfo}/>
    )
}