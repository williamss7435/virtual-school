import Connection from "./Connection";

class TutorService extends Connection {

    constructor(){
        super('http://localhost:8080')
    }

    async findAll(){
        return await this.AsyncGet("/tutors");
    }

    async save(tutor){
        return await this.AsyncPost("/tutors", tutor);
    }
    async replace(id, tutor){
        return await this.AsyncPut(`/tutors/${id}`, tutor);
    }

    async deleteById(id){
        return await this.AsyncDelete(`/tutors/${id}`);
    }

};

export default new TutorService();