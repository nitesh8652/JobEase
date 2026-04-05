import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Loading';

const ProtectedRoute = ({ children }) => {
    const { companyToken, companyAuth  } = useContext(AppContext);
  
    if(!companyAuth){
        return <Loading />
    }

    if (!companyToken) {
        return <Navigate to="/" replace />;
    }

   

    return children;
};

export default ProtectedRoute;
