import React, { useState, useEffect } from 'react';
import AuthService from '../../../services/AuthService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/FirebaseConfig';
import { toast } from 'react-toastify';

export default function ManageProfile() {
    const user = AuthService.getCurrentUser();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userRef = doc(db, "users", user.id);
            await updateDoc(userRef, formData);
            
            // Update local storage
            const updatedUser = { ...user, ...formData };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Manage Profile</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label>Email (Cannot be changed)</label>
                                    <input type="email" className="form-control" value={user?.email} disabled />
                                </div>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label>Address</label>
                                    <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Updating..." : "Update Profile"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
