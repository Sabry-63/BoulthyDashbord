import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('token'));

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route
            {...rest}
            render={(props) =>
                user && restricted ? (
                    <Redirect to="/Users" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
