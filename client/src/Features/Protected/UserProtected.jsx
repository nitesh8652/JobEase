import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Loading from '../Components/Loading';

const UserProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default UserProtectedRoute;
