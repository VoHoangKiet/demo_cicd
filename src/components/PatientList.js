import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function PatientList({ patients, onDelete, onEdit, onSort, sortConfig }) {
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
        }
        return null;
    };

    return (
        <div className='col-lg-12'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => onSort('name')}>
                            Name {getSortIndicator('name')}
                        </th>
                        <th onClick={() => onSort('age')}>
                            Age {getSortIndicator('age')}
                        </th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>
                                <Button variant='warning' onClick={() => onEdit(patient)}>Edit</Button>{' '}
                                <Button variant='danger' onClick={() => onDelete(patient.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
