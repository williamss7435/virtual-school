import Connection from "./Connection";

class StudentService extends Connection {

    constructor(){
        super('http://localhost:8080')
    }

    async findAll(){
        return await this.AsyncGet("/students");
    }

    async save(student){
        return await this.AsyncPost("/students", student);
    }
    async replace(id, student){
        return await this.AsyncPut(`/students/${id}`, student);
    }

    async deleteById(id){
        return await this.AsyncDelete(`/students/${id}`);
    }

};

export default new StudentService();