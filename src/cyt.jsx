import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxSketchLogo } from "react-icons/rx";
import './CreateEmployee.css';

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: '',
        createDate: new Date().toLocaleDateString(),
    });
    const [searchTerm, setSearchTerm] = useState('');

    // Load employees from local storage on component mount
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // Update local storage whenever employees state changes
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                courses: checked
                    ? [...prev.courses, value]
                    : prev.courses.filter(course => course !== value),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing employee
            setEmployees(prev => 
                prev.map(employee => 
                    employee.id === formData.id ? { ...formData } : employee
                )
            );
        } else {
            // Add new employee
            const newEmployee = {
                id: Date.now(),
                ...formData,
            };
            setEmployees(prev => [...prev, newEmployee]);
        }

        // Reset form
        setFormData({
            id: null,
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            courses: [],
            image: '',
            createDate: new Date().toLocaleDateString(),
        });
    };

    const handleEdit = (employee) => {
        setFormData(employee);
    };

    const handleDelete = (id) => {
        setEmployees(prev => prev.filter(employee => employee.id !== id));
    };

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("username");
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <span>
                    <span className='logo'>
                        <RxSketchLogo />
                        <a href="#" className="navbar-brand"><span className="text-danger">D</span>EALSDRAY</a>
                    </span>
                </span>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/welcome">Home</Link>
                    <Link className="nav-link" to="/EmployeeList">Employee List</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
                </div>
            </nav>
            <h2 id="create-employee-form">Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <label>
                        <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} required /> Female
                    </label>
                </div>
                <div>
                    <label>Course:</label>
                    <label>
                        <input type="checkbox" name="courses" value="MCA" checked={formData.courses.includes('MCA')} onChange={handleChange} /> MCA
                    </label>
                    <label>
                        <input type="checkbox" name="courses" value="BCA" checked={formData.courses.includes('BCA')} onChange={handleChange} /> BCA
                    </label>
                    <label>
                        <input type="checkbox" name="courses" value="BSC" checked={formData.courses.includes('BSC')} onChange={handleChange} /> BSC
                    </label>
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input 
                        type="file" 
                        name="image" 
                        accept=".jpg, .jpeg, .png" 
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setFormData(prev => ({ ...prev, image: reader.result }));
                                };
                                reader.readAsDataURL(file);
                            }
                        }} 
                    />
                </div>
                {formData.image && <img src={formData.image} alt="Employee" style={{ width: '100px', height: 'auto' }} />}
                <button type="submit" className='btn btn-warning'>{formData.id ? 'Update Employee' : 'Add Employee'}</button>
            </form>

            <h2>Employee List</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.courses.join(', ')}</td>
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
        </div>
    );
};

export default CreateEmployee;
