import React, { useEffect, useState } from 'react';
import DietPlanService from '../../../services/DietPlanService';
import { toast } from 'react-toastify';

export default function ViewDietPlans() {
    const [dietPlans, setDietPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const data = await DietPlanService.all();
                setDietPlans(data);
            } catch (error) {
                toast.error("Failed to load diet plans");
            }
            setLoading(false);
        };
        fetchDietPlans();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Diet Plans</h2>
            <div className="row">
                {loading ? <div className="text-center">Loading...</div> : dietPlans.length > 0 ? dietPlans.map((d) => (
                    <div className="col-md-4 mb-4" key={d.id}>
                        <div className="card shadow h-100">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">{d.name}</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Goal:</strong> {d.goal}</p>
                                <p><strong>Duration:</strong> {d.duration} Weeks</p>
                                <p>{d.description}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center">No Diet Plans Available</div>
                )}
            </div>
        </div>
    );
}
