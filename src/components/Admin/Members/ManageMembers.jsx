import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';

export default function ManageMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await UserService.allCustomers();
                setMembers(data);
            } catch (error) {
                toast.error("Failed to load members");
                console.error(error);
            }
            setLoading(false);
        };
        fetchMembers();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Manage Members</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Membership Plan</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? members.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone || 'N/A'}</td>
                                <td>{member.membershipId ? member.membershipId : 'No Active Plan'}</td>
                                <td>{member.membershipStartDate || 'N/A'}</td>
                                <td>{member.membershipEndDate || 'N/A'}</td>
                                <td>
                                    <span className={`badge ${member.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                        {member.status}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center">No Members Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
