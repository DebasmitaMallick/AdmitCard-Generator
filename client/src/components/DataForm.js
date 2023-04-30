import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import TextError from './TextError';

const initialValues = {
    studentName: "",
    phone: "",
    school: "",
    studentClass: "",
    roll: "",
    address: ""
};

const PHONE_REGEXP = /^[6-9]\d{9}$/i;

const validationSchema = Yup.object({
    studentName: Yup.string().required('This field is required.'),
    phone: Yup.string().matches(PHONE_REGEXP, 'Enter a valid 10 digit phone number.').required('This field is required.') ,
    school: Yup.string().required('This field is required.'),
    studentClass: Yup.number().min(1, 'Class should be at least 1').max(12, 'Class should not exceed 12').required('This field is required.'),
    roll: Yup.number().min(1, 'Roll Number should be at least 1').required('This field is required.'),
    address: Yup.string().required('This field is required.')
})

const DataForm = () => {

    const onSubmit = async ( student ) => {
        try {
            const response = await axios.post('http://localhost:3007/students', student);
            alert(response.data.message);
            navigate('/admitcard', {
                state: {
                    id: response.data.id
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    }


    const navigate = useNavigate();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className='admitCardForm'> 
                <h2 style={{textAlign: 'center'}}>Application form</h2>
                <div className='formControl'>
                    <label htmlFor='studentName'>Name: </label>
                    <Field type="text" name='studentName' id='studentName' />
                    <ErrorMessage name='studentName' component={TextError} />
                </div>
            
                <div className="formControl">
                    <label htmlFor='phone'>Phone: </label>
                    <Field type="tel" name='phone' id='phone' />                   
                    <ErrorMessage name='phone' component={TextError} />
                </div>

                <div className="formControl">
                    <label htmlFor='school'>School: </label>
                    <Field type="text" name='school' id='school' />
                    <ErrorMessage name='school' component={TextError} />
                </div>
                
                <div className="formControl">
                    <label htmlFor='studentClass'>Class: </label>
                    <Field type="number" min={1} max={12} name='studentClass' id='studentClass' />                        
                    <ErrorMessage name='studentClass' component={TextError} />
                </div>
                
                <div className="formControl">
                    <label htmlFor='roll'>Roll No.: </label>
                    <Field type="number" min={1} name='roll' id='roll' />                        
                    <ErrorMessage name='roll' component={TextError} />
                </div>
                
                <div className="formControl">
                    <label htmlFor='address'>Address: </label>
                    <Field type="text" name='address' id='address' />                       
                    <ErrorMessage name='address' component={TextError} />
                </div>
                
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default DataForm