import React, { useEffect, useState } from 'react';
import ProgressService from '../../../services/ProgressService';
import AuthService from '../../../services/AuthService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function TrackProgress() {
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = AuthService.getCurrentUser();
    const [formData, setFormData] = useState({
        weight: "",
        bodyFat: "",
        notes: "",
        date: new Date().toISOString().split('T')[0]
    });

    const fetchProgress = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await ProgressService.getUserProgress(user.id);
            setProgressList(data);
        } catch (error) {
            toast.error("Failed to load progress");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProgress = async (e) => {
        e.preventDefault();
        try {
            await ProgressService.add(formData, user.id);
            toast.success("Progress Recorded!");
            setFormData({ ...formData, weight: "", bodyFat: "", notes: "" });
            fetchProgress();
        } catch(error) {
            toast.error("Error saving progress");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await ProgressService.deleteProgress(id);
                Swal.fire("Deleted!", "Your record has been deleted.", "success");
                fetchProgress();
            } catch(error) {
                toast.error("Error deleting record");
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Track Fitness Progress</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Add New Record</h5>
                            <form onSubmit={handleAddProgress}>
                                <div className="mb-2">
                                    <label>Date</label>
                                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                                <div className="mb-2">
                                    <label>Weight (kg)</label>
                                    <input type="number" step="0.1" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required />
                                </div>
                                <div className="mb-2">
                                    <label>Body Fat (%)</label>
                                    <input type="number" step="0.1" className="form-control" name="bodyFat" value={formData.bodyFat} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label>Notes</label>
                                    <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Save Progress</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Weight (kg)</th>
                                    <th>Body Fat (%)</th>
                                    <th>Notes</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td colSpan="5" className="text-center">Loading...</td></tr> : progressList.length > 0 ? progressList.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.date}</td>
                                        <td>{p.weight}</td>
                                        <td>{p.bodyFat || 'N/A'}</td>
                                        <td>{p.notes || 'N/A'}</td>
                                        <td>
                                            <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No Progress Records Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
