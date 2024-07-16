import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { PatientContext } from '../context/PatientContext';
import { addPatient } from '../services/PatientService';

function PatientForm({onSave,editPatient}) {
    const{dispatch}=useContext(PatientContext);
   
    const[patient,setPatient]=useState({name:'',age:'',gender:'',address:''})
  useEffect(() => {
   if(editPatient){
    setPatient(editPatient)
   }
  }, [editPatient])
  
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(editPatient){
            onSave(patient);

        }else{
            const newPatient = await addPatient(patient);
            dispatch({type: 'ADD_PATIENT',payload:newPatient});

        }
        setPatient({name:'',age:'',gender:'',address:''})

    }
  
    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type="Text" value={patient.name} onChange={(e)=>setPatient({...patient,name:e.target.value})} required></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Age </Form.Label>
            <Form.Control type="Text" value={patient.age} onChange={(e)=>setPatient({...patient,age:e.target.value})} required></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label> Gender</Form.Label>
            <Form.Control type="Text" value={patient.gender} onChange={(e)=>setPatient({...patient,gender:e.target.value})} required></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Address </Form.Label>
            <Form.Control type="Text" value={patient.address} onChange={(e)=>setPatient({...patient,address:e.target.value})} required></Form.Control>
        </Form.Group>
        <br></br>
        <Form.Group>
           <Button type='submit'>{editPatient?'Save':'Add new patient'}</Button>
        </Form.Group>
    </Form>
  )
}

export default PatientForm
