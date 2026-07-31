import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import TrainerService from '../../../services/TrainerService';
import MembershipService from '../../../services/MembershipService';
import WorkoutService from '../../../services/WorkoutService';
import DietPlanService from '../../../services/DietPlanService';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [counts, setCounts] = useState({
        members: 0,
        trainers: 0,
        memberships: 0,
        workouts: 0,
        dietPlans: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const members = await UserService.allCustomers(); 
                const trainers = await TrainerService.all();
                const memberships = await MembershipService.all();
                const workouts = await WorkoutService.all();
                const dietPlans = await DietPlanService.all();

                setCounts({
                    members: members.length,
                    trainers: trainers.length,
                    memberships: memberships.length,
                    workouts: workouts.length,
                    dietPlans: dietPlans.length
                });
            } catch (error) {
                console.log("Error fetching counts for dashboard:", error);
            }
            setLoading(false);
        };

        fetchCounts();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>
            {loading ? (
                <h4 className="text-center text-muted">Loading statistics...</h4>
            ) : (
                <div className="row justify-content-center g-4 mt-3">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary shadow h-100">
                            <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                                <i className="bi bi-people display-4 mb-2"></i>
                                <h2 className="display-5 fw-bold">{counts.members}</h2>
                                <h5 className="card-title">Total Members</h5>
                                <Link to="/admin/members" className="btn btn-light btn-sm mt-3 mx-auto" style={{ width: '150px' }}>Manage Members</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-success shadow h-100">
                            <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                                <i className="bi bi-person-badge display-4 mb-2"></i>
                                <h2 className="display-5 fw-bold">{counts.trainers}</h2>
                                <h5 className="card-title">Total Trainers</h5>
                                <Link to="/admin/trainers" className="btn btn-light btn-sm mt-3 mx-auto" style={{ width: '150px' }}>Manage Trainers</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-info shadow h-100">
                            <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                                <i className="bi bi-card-heading display-4 mb-2"></i>
                                <h2 className="display-5 fw-bold">{counts.memberships}</h2>
                                <h5 className="card-title">Membership Plans</h5>
                                <Link to="/admin/membershipplan" className="btn btn-light btn-sm mt-3 mx-auto" style={{ width: '150px' }}>Manage Plans</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-warning shadow h-100">
                            <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                                <i className="bi bi-activity display-4 mb-2"></i>
                                <h2 className="display-5 fw-bold">{counts.workouts}</h2>
                                <h5 className="card-title">Workouts</h5>
                                <Link to="/admin/workouts" className="btn btn-light btn-sm mt-3 mx-auto" style={{ width: '150px' }}>Manage Workouts</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-danger shadow h-100">
                            <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                                <i className="bi bi-apple display-4 mb-2"></i>
                                <h2 className="display-5 fw-bold">{counts.dietPlans}</h2>
                                <h5 className="card-title">Diet Plans</h5>
                                <Link to="/admin/dietplans" className="btn btn-light btn-sm mt-3 mx-auto" style={{ width: '150px' }}>Manage Diet Plans</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
