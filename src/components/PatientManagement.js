import React, { useContext, useState } from 'react';
import PatientList from './PatientList';
import { PatientContext } from '../context/PatientContext';
import PatientForm from './PatientForm';
import { updatePatient, deletePatient } from '../services/PatientService';
import DeleteModal from './DeleteModal';
import { Form, Pagination } from 'react-bootstrap';

function PatientManagement() {
    const { state, dispatch } = useContext(PatientContext);
    const [editPatient, setEditPatient] = useState(null);
    const [deletePatientId, setDeletePatientId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const sizePage = 5; 
    const indexOfLast = currentPage * sizePage;
    const indexOfFirst = indexOfLast - sizePage;
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSave = async (updatePatientInfo) => {
        try {
            console.log("Saving patient:", updatePatientInfo); 
            const updated = await updatePatient(updatePatientInfo);
            console.log("Updated patient:", updated); 
            dispatch({ type: 'EDIT_PATIENT', payload: updated });
            setEditPatient(null); 
        } catch (error) {
            console.error("Failed to save patient:", error); 
        }
    };

    const handleEdit = (patient) => {
        console.log("Editing patient:", patient);
        setEditPatient(patient);
    };

    const handleDelete = (id) => {
        console.log("Setting patient for deletion:", id);
        setDeletePatientId(id);
        setShowModal(true);
    };

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedPatients = [...state.patients].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredPatients = sortedPatients.filter(t => t.name.toLowerCase().includes(searchKey.toLowerCase()));
    const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);

    const confirmDelete = async () => {
        try {
            console.log("Confirming deletion of patient with id:", deletePatientId);
            await deletePatient(deletePatientId);
            dispatch({ type: 'DELETE_PATIENT', payload: deletePatientId });
            console.log("Patient deleted successfully with id:", deletePatientId);
            setShowModal(false);
        } catch (error) {
            console.error("Failed to delete patient:", error);
        }
    };

    return (
        <div className='col-lg-12'>
            <h2>Patient Management</h2>
            <PatientForm onSave={handleSave} editPatient={editPatient} />
            <br></br>
            <Form.Control
                type="text"
                placeholder='Search patient...'
                value={searchKey}
                onChange={handleSearch}
            />
            <br></br>
            {state.loading ? (
                <p className='alert alert-danger'>Loading...</p>
            ) : (
                <>
                    <PatientList
                        patients={currentPatients}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />

                    <Pagination>
                        {Array.from({ length: Math.ceil(filteredPatients.length / sizePage) }, (_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            )}

            <DeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default PatientManagement;
