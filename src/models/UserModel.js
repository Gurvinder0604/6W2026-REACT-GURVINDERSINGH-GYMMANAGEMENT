class UserModel {
    constructor() {
        this.name = "";
        this.email = "";
        this.phone = "";
        this.address = "";
        this.profileImage = "";
        this.userType = "customer"; // admin/customer
        this.status = "active";
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        // Additional properties for customer membership
        this.membershipId = null;
        this.membershipStartDate = null;
        this.membershipEndDate = null;
    }
}

export default UserModel;
