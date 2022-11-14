import { Route, Redirect, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useSelector } from '../../services/hooks';
type TProtectedRouteProps = {
    children: ReactNode;
    exact?: boolean;
    path: string;
}
export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
    const user = useSelector(store => store.user.user);
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={
                () => (user ? (children) : (
                    <Redirect to={{
                        pathname: `/login`,
                        state: { from: location },
                    }}
                    />
                ))
            }
        />
    );
};