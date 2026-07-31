class DietPlanModel {
    constructor() {
        this.name = "";
        this.description = "";
        this.goal = "Weight Loss"; // Weight Loss, Muscle Gain, Maintenance
        this.duration = "";
        this.createdAt = new Date().toISOString();
    }
}
export default DietPlanModel;
