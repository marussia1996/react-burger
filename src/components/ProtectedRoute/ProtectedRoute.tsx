import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useSelector } from '../../services/hooks/useDispatch&Selector';
export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}> = ({ children, ...rest }) => {
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