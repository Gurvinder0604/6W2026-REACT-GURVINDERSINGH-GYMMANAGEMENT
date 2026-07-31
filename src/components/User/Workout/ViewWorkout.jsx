import React, { useEffect, useState } from 'react';
import WorkoutService from '../../../services/WorkoutService';
import { toast } from 'react-toastify';

export default function ViewWorkout() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await WorkoutService.all();
                setWorkouts(data);
            } catch (error) {
                toast.error("Failed to load workouts");
            }
            setLoading(false);
        };
        fetchWorkouts();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Daily Workouts</h2>
            <div className="row">
                {loading ? <div className="text-center">Loading...</div> : workouts.length > 0 ? workouts.map((w) => (
                    <div className="col-md-4 mb-4" key={w.id}>
                        <div className="card shadow h-100">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">{w.name}</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Target Muscle:</strong> {w.targetMuscle}</p>
                                <p><strong>Duration:</strong> {w.duration} mins</p>
                                <p><strong>Difficulty:</strong> {w.difficulty}</p>
                                <p>{w.description}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center">No Workouts Available</div>
                )}
            </div>
        </div>
    );
}
