import TrainerService from "../../../services/TrainerService";
import { useState } from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CloudinaryService from "../../../services/CloudinaryService";

export default function Addtrainers() {
  const [trainerName, setTrainerName] = useState('');
  const [specialzation, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneno, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState('');
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  async function addTrainer(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (image) {
      imageUrl = await CloudinaryService.upload(image);
    }
    
    try {
      let payload = {
        name: trainerName,
        specialization: specialzation,
        experience: experience,
        phoneno: phoneno,
        email: email,
        address: address,
        image: imageUrl
      };

      await TrainerService.add(payload);
      toast.success("Trainer added");
      nav(-1);
    } catch (err) {
      toast.error("Error adding trainer");
      console.log("Error:", err);
    }
    setLoading(false);
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Add New Trainer</h3>
              <form onSubmit={addTrainer}>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" className="form-control" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Specialization</label>
                  <input type="text" className="form-control" value={specialzation} onChange={(e) => setSpecialization(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Experience (Years)</label>
                  <input type="text" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label>Profile Image</label>
                  <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Adding Trainer..." : "Add Trainer"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}