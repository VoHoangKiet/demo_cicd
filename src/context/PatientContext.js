import { createContext, useReducer, useEffect } from "react";
import { initState, patientReducer } from "../reducer/PatientReducer";
import { fetchPatients } from "../services/PatientService";

export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(patientReducer, initState);

    useEffect(() => {
        const getPatients = async () => {
            try {
                const patients = await fetchPatients(); 
                dispatch({ type: 'FETCH_SUCCESS', payload: patients });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };

        const delayFetch = () => { 
            setTimeout(() => {
                getPatients();
            }, 1000);
        };

        delayFetch();
    }, []);

    return (
        <PatientContext.Provider value={{ state, dispatch }}>
            {children}
        </PatientContext.Provider>
    );
};
