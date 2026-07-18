import { Link } from "react-router-dom"

export default function Managemembership(){
    return(
        <>
        
         <div className="container">

                <div class="d-flex justify-content-between my-4">
                    <div >
                        <h2>Manage Membership Plan</h2>
                    </div>
                    <div >
                        <Link to="/admin/membershipplan/add"  >
                            <li><button class="btn btn-primary">Add Membership Plan</button></li>
                        </Link>
                    </div>
                </div>
            </div>



        
        </>
    )
}