import React from "react";
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ auth, onlyAdmin, component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => {

            if (auth.isAuthenticated === true && onlyAdmin === true && auth.user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841") {
                return <Component auth={auth} {...props} />
            }
            else if (auth.isAuthenticated === true && !onlyAdmin) {
                return <Component auth={auth} {...props} />
            }
            else if (auth.isAuthenticated === true) {
                return <Redirect to="/Home" />
            }
            else {
                return <Redirect to={{ path: "/", state: { from: props.location } }} />
            }

        }} />
    );

}

export default ProtectedRoute;