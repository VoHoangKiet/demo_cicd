import axios from 'axios';
const API_URL = 'http://localhost:9999/patients';

export const fetchPatients = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addPatient = async (patient) => {
    const res = await axios.post(API_URL, patient);
    return res.data;
};

export const updatePatient = async (patient) => {
    const res = await axios.put(`${API_URL}/${patient.id}`, patient);
    return res.data;
};

export const deletePatient = async (id) => {
    console.log("Deleting patient with id:", id);
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        console.log("Delete response:", res);
        return res.data;
    } catch (error) {
        console.error("Failed to delete patient:", error);
        throw error;
    }
};
