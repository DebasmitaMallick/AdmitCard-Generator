import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentInfo from './StudentInfo';

const API = process.env.REACT_APP_API_URL;

const AdmitCard = () => {

    const location = useLocation();
    const studentId = location.state ? location.state.id : null;

    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get(`${API}/students/${studentId}`);
                setStudent(...res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchStudentData();
    }, [studentId])
    

    if(!studentId) {
        return <p>You cannot access this page</p>
    }
    return (
        <div className='dataCardContainer'>
                <div className='admitCardContainer'>
                    <h2>Admit Card</h2>
                    <div>
                        <span >Name:</span>
                        <span >{student.name}</span>
                    </div>
                    <div >
                        <span >School:</span>
                        <span >{student.school}</span>
                    </div>
                    <div >
                        <span >Class:</span>
                        <span >{student.class}</span>
                    </div>
                    <div >
                        <span >Roll No.:</span>
                        <span >{student.roll}</span>
                    </div>
                    <div >
                        <span >Phone No.:</span>
                        <span >{student.phone}</span>
                    </div>
                    <div >
                        <span >Address:</span>
                        <span >{student.address}</span>
                    </div>
                </div>
                <div className='btns'>
                    <button onClick={() => navigate('/')}>Back</button>
                    <button>
                        <PDFDownloadLink document={<StudentInfo student={student} />} fileName="document.pdf">
                            {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download'
                            }
                        </PDFDownloadLink>
                    </button>
                </div>
        </div>
    )
}

export default AdmitCard