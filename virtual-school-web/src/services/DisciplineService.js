import Connection from "./Connection";

class DisciplineService extends Connection {

    constructor(){
        super('http://localhost:8080')
    }

    async findAll(){
        return await this.AsyncGet("/disciplines");
    }

    async save(discipline){
        return await this.AsyncPost("/disciplines", discipline);
    }
    async replace(id, discipline){
        return await this.AsyncPut(`/disciplines/${id}`, discipline);
    }

    async deleteById(id){
        return await this.AsyncDelete(`/disciplines/${id}`);
    }

    async findAllByDisciplineId(disciplineId){
        return await this.AsyncGet(`/disciplines/${disciplineId}/students`);
    }

};

export default new DisciplineService();