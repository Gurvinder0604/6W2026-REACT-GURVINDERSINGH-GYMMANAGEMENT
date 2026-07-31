import React, { useEffect, useState } from 'react';
import AuthService from '../../../services/AuthService';
import MembershipService from '../../../services/MembershipService';
import { toast } from 'react-toastify';

export default function MembershipDetails() {
    const user = AuthService.getCurrentUser();
    const [planDetails, setPlanDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            if (user?.membershipId) {
                try {
                    const data = await MembershipService.single(user.membershipId);
                    setPlanDetails(data);
                } catch (error) {
                    toast.error("Error fetching plan details");
                }
            }
            setLoading(false);
        };
        fetchPlanDetails();
    }, [user?.membershipId]);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Membership Details</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            {loading ? (
                                <p>Loading...</p>
                            ) : user?.membershipId ? (
                                <>
                                    <h4 className="text-primary mb-3">{planDetails?.planname || user.membershipName}</h4>
                                    <p><strong>Start Date:</strong> {user.membershipStartDate}</p>
                                    <p><strong>End Date:</strong> {user.membershipEndDate}</p>
                                    <p><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
                                    {planDetails && <p><strong>Description:</strong> {planDetails.description}</p>}
                                </>
                            ) : (
                                <div className="py-4">
                                    <h5 className="text-muted mb-3">You don't have an active membership plan.</h5>
                                    <a href="/browse-memberships" className="btn btn-primary">Browse Plans</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
