import React, { useEffect, useState } from 'react';
import DietPlanService from '../../../services/DietPlanService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageDietPlans() {
    const [dietPlans, setDietPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        goal: "Weight Loss",
        duration: ""
    });

    const fetchDietPlans = async () => {
        setLoading(true);
        try {
            const data = await DietPlanService.all();
            setDietPlans(data);
        } catch (error) {
            toast.error("Failed to load diet plans");
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDietPlans();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddDietPlan = async (e) => {
        e.preventDefault();
        try {
            await DietPlanService.add(formData);
            toast.success("Diet Plan Added Successfully");
            setFormData({ name: "", description: "", goal: "Weight Loss", duration: "" });
            fetchDietPlans();
        } catch(error) {
            toast.error("Error adding diet plan");
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
                await DietPlanService.deleteDietPlan(id);
                Swal.fire("Deleted!", "Diet plan has been deleted.", "success");
                fetchDietPlans();
            } catch(error) {
                toast.error("Error deleting diet plan");
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Manage Diet Plans</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Add New Diet Plan</h5>
                            <form onSubmit={handleAddDietPlan}>
                                <div className="mb-2">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-2">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label>Goal</label>
                                    <select className="form-control" name="goal" value={formData.goal} onChange={handleChange}>
                                        <option value="Weight Loss">Weight Loss</option>
                                        <option value="Muscle Gain">Muscle Gain</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Duration (Weeks)</label>
                                    <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Add Diet Plan</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Goal</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td colSpan="4" className="text-center">Loading...</td></tr> : dietPlans.length > 0 ? dietPlans.map((d, index) => (
                                    <tr key={d.id}>
                                        <td>{d.name}</td>
                                        <td>{d.goal}</td>
                                        <td>{d.duration} Weeks</td>
                                        <td>
                                            <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No Diet Plans Found</td>
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
