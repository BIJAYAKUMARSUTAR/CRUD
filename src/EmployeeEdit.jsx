import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        const foundEmployee = storedEmployees.find(emp => emp.id === Number(id));
        if (foundEmployee) {
            setEmployee(foundEmployee);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        const updatedEmployees = storedEmployees.map(emp => emp.id === employee.id ? employee : emp);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        navigate('/create-employee'); // Redirect back to the create employee page
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Repeat your form fields for editing */}
            <input type="text" name="name" value={employee.name} onChange={handleChange} required />
            {/* Add other fields similarly */}
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default EmployeeEdit;
