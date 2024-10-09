import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RxSketchLogo } from "react-icons/rx";
import './EmployeeList.css'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Load employees from local storage on component mount
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // Update local storage whenever employees state changes
    useEffect(() => {
        if(employees.length>0){
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees]);

    // Function to handle adding a new employee
    const handleAddEmployee = (newEmployee) => {
        setEmployees((prev) => [...prev, newEmployee]);
        
    };
    const handleLogout = () => {
        // Clear user session logic (if any)
        navigate("/");
    };

    

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    //edit the emp detals
    const handleEdit = (employee) => {
        navigate(`/edit-employee/${employee.id}`); // Navigate to the edit page with the employee ID
    };

    

    const handleDelete = (id) => {
        setEmployees(prev => prev.filter(employee => employee.id !== id));
    };
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <span><span className='logo'><RxSketchLogo/>  <a href="#" class="navbar-brand"><span class="text-danger">D</span>EALSDRAY</a></span></span>
                            <div className="container-fluid">
                    <Link className="navbar-brand" to="/Welcome">Home</Link>
                    <Link className="nav-link" to="/CreateEmployee">Add Employee</Link>
                   
                    <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
                </div>
            </nav>

            <h2>Employee List</h2>
            <p>Total Count: {filteredEmployees.length}</p>
            <input
                type="text"
                placeholder="Enter Search Keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Display employee table */}
            <table>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td className='sp-5'>{employee.id}</td>
                                <td className='sp-5'>{employee.name}</td>
                                <td className='sp-5'>{employee.email}</td>
                                <td className='sp-5'>{employee.mobile}</td>
                                <td className='sp-5'>{employee.designation}</td>
                                <td className='sp-5'>{employee.gender}</td>
                                <td className='sp-5'>{employee.courses.join(', ')}</td>
                                <td className='sp-5'>{employee.createDate}</td>
                                <td>
                                    <button onClick={() => handleEdit(employee)} className='btn btn-info'>Edit</button>
                                    <button onClick={() => handleDelete(employee.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Employee Form */}
            <CreateEmployee onAddEmployee={handleAddEmployee} />
        </div>
    );
};

const CreateEmployee = ({ onAddEmployee }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        createDate: new Date().toLocaleDateString(),
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                courses: checked 
                    ? [...prev.courses, value] 
                    : prev.courses.filter(course => course !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: Date.now(), // Unique ID based on timestamp
            ...formData
        };
        onAddEmployee(newEmployee);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            courses: [],
            createDate: new Date().toLocaleDateString(),
        });
        onAddEmployee(storedEmployees);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            courses: [],
            createDate: new Date().toLocaleDateString(),
        });
    };

    return (
        <div>
           
        </div>
    );
};

export default EmployeeList;
