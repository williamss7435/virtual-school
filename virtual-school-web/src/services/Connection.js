import axios from 'axios';

export default class Connection {

constructor(baseURL){
    this.connection = axios.create({
        baseURL
    });

    //this.connection.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
}

async AsyncGet(url){
    try {
        const response = await this.connection.get(url);
      
        return {
            data: response.data,
            success: true
        };

    } catch (error) {
        return {
            success: false,
            error: error.response.data.error,
        };

    }
}

async AsyncPost(url, data){ 
    try {
        const response = await this.connection.post(url, data);
        return {
            data: response.data,
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.response.data.error,
        };

    }
}

async AsyncPut(url, data){
    try {

        const response = await this.connection.put(url, data);
      
        return {
            data: response.data,
            success: true
        };

    } catch (error) {
        return {
            success: false,
            error: error.response.data.error,
        };

    }
}

async AsyncDelete(url, data){
    try {
        const response = await this.connection.delete(url, data);
      
        return {
            data: response.data,
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.response.data.error,
        };
    }
}

};