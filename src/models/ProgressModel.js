    class ProgressModel {
    constructor() {
        this.userId = "";
        this.weight = "";
        this.bodyFat = "";
        this.notes = "";
        this.date = new Date().toISOString().split('T')[0];
        this.createdAt = new Date().toISOString();
    }
}
export default ProgressModel;
