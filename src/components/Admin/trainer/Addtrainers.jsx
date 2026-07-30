import TrainerService from "../../../services/TrainerService";
import { useState } from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CloudinaryService from "../../../services/CloudinaryService";
export default function Addtrainers() {

  const [trainerName, setTrainerName] = useState('');
  const [specialzation, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneno, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const [image, setImage] = useState('');
  const nav = useNavigate()


  async function addTrainer(e) {
    e.preventDefault();

    let imageUrl = ""

    if (image) {
      imageUrl = await CloudinaryService.upload(image)
    }
    try {
      let payload = {
        name: trainerName,
        specialzation: specialzation,
        experience: experience,
        phoneno: phoneno,
        email: email,
        address: address,
        image: imageUrl
      }

      await TrainerService.add(payload)
      nav(-1)
      toast.success("Trainer added")
       }
    catch (err) {
      
      toast.error("Error adding trainer")
      console.log("Error:", err)
    }


  }


  return (

    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Add Category</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="#">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Pages</Link>
          </li>
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>

      <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.4s">
        <div className="form-section bg-dark p-5 h-100">
          <h1 className="display-4 text-white mb-4">Get In touch</h1>
          <form onSubmit={addTrainer}>
            <div className="row g-4">
              <div className="col-12 ">
                <div className="form-floating form-section-col">
                  <input
                    type="text"
                    className="form-control border-0"
                    id="name"
                    placeholder="Your Name"
                    onChange={(e) => { setTrainerName(e.target.value) }}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>

              <div className="col-lg-12 col-xl-6">
                <div className="form-floating form-section-col">
                  <input
                    type="text"
                    className="form-control border-0"
                    id="specialzation"
                    placeholder="Your Specialzation"
                    onChange={(e) => { setSpecialization(e.target.value) }}
                  />
                  <label htmlFor="name">Your Specialzation</label>
                </div>
              </div>

              <div className="col-lg-12 col-xl-6">
                <div className="form-floating form-section-col">
                  <input
                    type="text"
                    className="form-control border-0"
                    id="Experience"
                    placeholder="Your Experience"
                    onChange={(e) => { setExperience(e.target.value) }}
                  />
                  <label htmlFor="name">Your Experience</label>
                </div>
              </div>

              <div className="col-lg-12 col-xl-6">
                <div className="form-floating form-section-col">
                  <input
                    type="phone"
                    className="form-control border-0"
                    id="phone"
                    placeholder="Phone"
                    onChange={(e) => { setPhoneNo(e.target.value) }}
                  />
                  <label htmlFor="phone">Your Phone</label>
                </div>
              </div>

              <div className="col-lg-12 col-xl-6">
                <div className="form-floating form-section-col">
                  <input
                    type="email"
                    className="form-control border-0"
                    id="email"
                    placeholder="Your Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating form-section-col">
                  <input
                    type="address"
                    className="form-control border-0"
                    id="address"
                    placeholder="Address"
                    onChange={(e) => { setAddress(e.target.value) }}
                  />
                  <label htmlFor="phone">Your Address</label>
                </div>
              </div>



              <div className="col-12">
                <div className="form-floating form-section-col">
                  <input
                    type="text"
                    className="form-control border-0"
                    id="specialzation"
                    placeholder="Specialzation"
                  />
                  <label htmlFor="Specialzation">Specialzation</label>
                </div>
              </div>
              < input
                type="file"
                className="w-100 form-control border-0 py-3 mb-4"
                placeholder="Enter description" onChange={(e) => { setImage(e.target.files[0]) }}
              />

              <div className="col-12">
                <div className="form-section-col">
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                    type="submit"
                  >
                    Submit
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>





      {/* <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form action="" className="" onSubmit={addTrainer}>
            
           
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Your Name"
              onChange={(e)=>{setTrainerName(e.target.value)}}
              
            />
             <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Your Phoneno"
              onChange={(e)=>{setPhoneNo(e.target.value)}}

            
            />
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Your Email"
              onChange={(e)=>{setEmail(e.target.value)}}

            
            />
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Your Address"
              onChange={(e)=>{setAddress(e.target.value)}}

            
            />
          
            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
              type="submit" OnClick
            >
              Submit
            </button>
          </form>
    </div>
    </div>  */}


    </>
  )
}