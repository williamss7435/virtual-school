import {useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';

import LoadingComponent from "../../components/LoadingComponent";

import {Container, Title, Form, Input, ButtonsContainer} from "./styles.js";

import TutorService from './../../services/TutorService';
import { useEffect } from "react";

export default function EditTutorPage(){
    const history = useHistory();
    const state = useLocation();
    
    const [loading, setLoading] = useState(false);
    
    const [id, setId] = useState(state.tutor ? state.tutor.id : null);
    const [name, setName] = useState(state.tutor ? state.tutor.name : null);
    const [email, setEmail] = useState(state.tutor ? state.tutor.email : null);
    const [employeeCode, setEmployeeCode] = useState(state.tutor ? state.tutor.employeeCode : null);
    const [password, setPassword] = useState(state.tutor ? state.tutor.password : null);

    useEffect(() => {
        (() => {
            if(id == null) {
                history.push("/tutor")
            }
        })()
    },[history, id]);

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

        const response = await TutorService.replace(
            id, 
            {name, password, email, employeeCode}
        );

        if(response.success){
            toast.success("Tutor editado com sucesso");
        }else {
            toast.error("Ocorreu um erro ao editar o tutor");
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}
            
            <Form onSubmit={handleSubmit}>
                <Title>Editar Tutor</Title>

                <label>Nome</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} />

                <label>Email</label>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>

                <label>Código de Funcionário</label>
                <Input type="number" value={employeeCode} onChange={(event) => setEmployeeCode(event.target.value)}/>

                <label>Senha</label>
                <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>

                <ButtonsContainer>
                    <button className="cancel" onClick={() => history.push('/tutor')}>Voltar</button>
                    <button type="submit" className="save">Salvar</button>
                </ButtonsContainer>
            </Form>
        </Container>
    );
}