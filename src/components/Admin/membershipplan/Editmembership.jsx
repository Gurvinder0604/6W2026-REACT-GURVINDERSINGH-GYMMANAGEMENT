export default function Editmembership(){
    return(
        <>
        
        <div className="container">

                <div class="d-flex justify-content-between my-4">
                    <div >
                        <h2>Manage Membership Plan</h2>
                    </div>
                    <div >
                        <Link to="/admin/membershipPlan/add"  >
                            <li><button class="btn btn-primary">Add Membership Plan</button></li>
                        </Link>
                    </div>
                </div>
            </div>

             <div className="d-flex justify-content-center mt-5">

                <div className="col-lg-7">
                    <form action="" onSubmit={Editmembership} className="" >


                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4" 
                            value={planName}
                            placeholder="Enter Trainer Name" onChange={(e) => { setPlanName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={Duration}
                            placeholder="Enter Specialsation" onChange={(e) => { setDuration(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={Experience}
                            placeholder="Enter Experience" onChange={(e) => { setExperience(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={PhoneNo}
                            placeholder="Enter Phoneno" onChange={(e) => { setPhoneNo(e.target.value) }}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={Email}
                            placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }}
                        />
                         <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={Address}
                            placeholder="Enter Address" onChange={(e) => { setAddress(e.target.value) }}
                        />
                        
                        {/* <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={Subject}
                            placeholder="Enter Subject" onChange={(e) => { setSubject(e.target.value) }}
                        /> */}
                        
                        <input
                            type="file"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter Image" onChange={(e) => { setImage(e.target.files[0]) }}
                        />
                        





                        <button
                            className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        
        
        </>
    )
}