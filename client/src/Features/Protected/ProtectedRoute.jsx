import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { companyToken } = useContext(AppContext);

    if (!companyToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
