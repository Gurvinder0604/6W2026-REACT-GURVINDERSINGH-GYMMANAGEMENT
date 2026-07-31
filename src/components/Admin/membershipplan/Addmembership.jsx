import { useState } from "react"
import { toast } from "react-toastify"
import MembershipService from "../../../services/MembershipService";
import { useNavigate } from "react-router-dom";

export default function AddMembership() {
  const [planname, setPlanName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function addMembershipPlan(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        planname: planname,
        duration: duration,
        price: price,
        description: description,
      };

      await MembershipService.add(payload);
      toast.success("Membership added");
      nav(-1);
    } catch (e) {
      toast.error("Error: " + e);
    }
    setLoading(false);
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Add Membership Plan</h3>
              <form onSubmit={addMembershipPlan}>
                <div className="mb-3">
                  <label>Plan Name</label>
                  <input type="text" className="form-control" value={planname} onChange={(e) => setPlanName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Duration</label>
                  <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Price</label>
                  <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label>Description</label>
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Adding Plan..." : "Add Plan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}