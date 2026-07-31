class WorkoutModel {
    constructor() {
        this.name = "";
        this.description = "";
        this.targetMuscle = "";
        this.duration = "";
        this.difficulty = "Beginner"; // Beginner, Intermediate, Advanced
        this.createdAt = new Date().toISOString();
    }
}
export default WorkoutModel;
