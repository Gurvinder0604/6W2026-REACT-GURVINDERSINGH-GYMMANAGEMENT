import React from 'react';
import AuthService from '../../../services/AuthService';
import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
    const user = AuthService.getCurrentUser();

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 text-primary">Welcome to Your Dashboard, {user?.name}!</h2>
            <div className="row justify-content-center g-4 mt-3">
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                            <i className="bi bi-card-checklist display-4 mb-2"></i>
                            <h4 className="card-title">My Membership</h4>
                            {user?.membershipId ? (
                                <>
                                    <p className="card-text mb-1 mt-2 fw-bold fs-5">{user.membershipName}</p>
                                    <p className="card-text small mb-4">Expires: {user.membershipEndDate}</p>
                                    <Link to="/dashboard/memberships" className="btn btn-light btn-sm mt-auto mx-auto" style={{ width: '150px' }}>View Plan</Link>
                                </>
                            ) : (
                                <>
                                    <p className="card-text mb-4 mt-2 fs-5">No Active Plan</p>
                                    <Link to="/dashboard/browse-memberships" className="btn btn-light btn-sm mt-auto mx-auto" style={{ width: '150px' }}>Purchase Plan</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                            <i className="bi bi-graph-up-arrow display-4 mb-2"></i>
                            <h4 className="card-title">Fitness Progress</h4>
                            <p className="card-text mb-4 mt-2">Track your weight and body measurements regularly to stay motivated.</p>
                            <Link to="/dashboard/progress" className="btn btn-light btn-sm mt-auto mx-auto" style={{ width: '150px' }}>Track Progress</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-info shadow h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                            <i className="bi bi-activity display-4 mb-2"></i>
                            <h4 className="card-title">Workouts & Diet</h4>
                            <p className="card-text mb-4 mt-2">Follow your recommended daily exercise and nutrition plans.</p>
                            <div className="d-flex justify-content-center gap-2 mt-auto">
                                <Link to="/dashboard/workouts" className="btn btn-light btn-sm" style={{ width: '100px' }}>Workouts</Link>
                                <Link to="/dashboard/diet-plans" className="btn btn-light btn-sm" style={{ width: '100px' }}>Diet Plans</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
