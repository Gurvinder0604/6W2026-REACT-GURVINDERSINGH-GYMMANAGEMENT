import React, { useEffect, useState } from 'react';
import WorkoutService from '../../../services/WorkoutService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        targetMuscle: "",
        duration: "",
        difficulty: "Beginner"
    });

    const fetchWorkouts = async () => {
        setLoading(true);
        try {
            const data = await WorkoutService.all();
            setWorkouts(data);
        } catch (error) {
            toast.error("Failed to load workouts");
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddWorkout = async (e) => {
        e.preventDefault();
        try {
            await WorkoutService.add(formData);
            toast.success("Workout Added Successfully");
            setFormData({ name: "", description: "", targetMuscle: "", duration: "", difficulty: "Beginner" });
            fetchWorkouts();
        } catch(error) {
            toast.error("Error adding workout");
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
                await WorkoutService.deleteWorkout(id);
                Swal.fire("Deleted!", "Workout has been deleted.", "success");
                fetchWorkouts();
            } catch(error) {
                toast.error("Error deleting workout");
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Manage Workouts</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Add New Workout</h5>
                            <form onSubmit={handleAddWorkout}>
                                <div className="mb-2">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-2">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-2">
                                    <label>Target Muscle</label>
                                    <input type="text" className="form-control" name="targetMuscle" value={formData.targetMuscle} onChange={handleChange} required />
                                </div>
                                <div className="mb-2">
                                    <label>Duration (mins)</label>
                                    <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Difficulty</label>
                                    <select className="form-control" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Add Workout</button>
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
                                    <th>Target Muscle</th>
                                    <th>Duration</th>
                                    <th>Difficulty</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td colSpan="5" className="text-center">Loading...</td></tr> : workouts.length > 0 ? workouts.map((w, index) => (
                                    <tr key={w.id}>
                                        <td>{w.name}</td>
                                        <td>{w.targetMuscle}</td>
                                        <td>{w.duration} mins</td>
                                        <td>{w.difficulty}</td>
                                        <td>
                                            <button onClick={() => handleDelete(w.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No Workouts Found</td>
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
