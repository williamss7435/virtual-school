import {useState} from "react";
import {useHistory, useParams, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {parseISO, format} from 'date-fns';
import LoadingComponent from "../../components/LoadingComponent";

import {Container, Title, Form, Input, ButtonsContainer} from "./styles.js";

import StudentService from './../../services/StudentService';
import { useEffect } from "react";

export default function EditStudentPage(){
    const history = useHistory();
    const state = useLocation();
    
    const [loading, setLoading] = useState(false);
    
    const [id, setId] = useState(state.student ? state.student.id : null);
    const [name, setName] = useState(state.student ? state.student.name : null);
    const [email, setEmail] = useState(state.student ? state.student.email : null);
    const [registration, setRegistration] = useState(state.student ? state.student.registration : null);
    const [password, setPassword] = useState(state.student ? state.student.password : null);

    useEffect(() => {
        (() => {
            if(id == null) {
                history.push("/student")
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

        const response = await StudentService.replace(
            id, 
            {name, password, email, registration}
        );

        if(response.success){
            toast.success("Estudante editado com sucesso");
        }else {
            toast.error("Ocorreu um erro ao editar o estudante");
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}
            
            <Form onSubmit={handleSubmit}>
                <Title>Editar Estudante</Title>

                <label>Nome</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} />

                <label>Email</label>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>

                <label>Matricula</label>
                <Input type="number" value={registration} onChange={(event) => setRegistration(event.target.value)}/>

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