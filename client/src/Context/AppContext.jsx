import { createContext, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [searchfilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [issearched, setsearched] = useState(false);

    const value = {
        setSearchFilter, searchfilter,
        setsearched, issearched
    }

    return (<AppContext.Provider value={value} >

        {props.children}

    </AppContext.Provider>)

}