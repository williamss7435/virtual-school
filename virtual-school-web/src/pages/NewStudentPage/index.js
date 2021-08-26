import { useState } from "react";
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import LoadingComponent from "../../components/LoadingComponent";

import {Container, Title, Form, Input, ButtonsContainer} from "./styles.js";

import StudentService from './../../services/StudentService';

export default function NewStudentPage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);
        
        if(name.length < 4){
            toast.error("O nome deve ser maior quer 4 digitos");
            setLoading(false);
            return;
        }

        if(password.length < 4){
            toast.error("A senha deve ser maior quer 4 digitos");
            setLoading(false);
            return;
        }

        const response = await StudentService.save({
            name,
            password,
            email
        });

        if(response.success){
            toast.success("Estudante cadastrado com sucesso");
            setName("");
            setEmail("");
            setPassword("");
        }else {
            toast.error("Ocorreu um erro ao salvar o estudante");
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}
            
            <Form onSubmit={handleSubmit}>
                <Title>Novo Estudante</Title>

                <label>Nome</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} />

                <label>Email</label>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>

                <label>Senha</label>
                <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>

                <ButtonsContainer>
                    <button className="cancel" onClick={() => history.push('/student')}>Voltar</button>
                    <button type="submit" className="save">Salvar</button>
                </ButtonsContainer>
            </Form>
        </Container>
    );
}