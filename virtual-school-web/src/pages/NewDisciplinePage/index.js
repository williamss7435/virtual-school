import { useState } from "react";
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import LoadingComponent from "../../components/LoadingComponent";

import {Container, Title, Form, Input, ButtonsContainer, Select} from "./styles.js";

import DisciplineService from './../../services/DisciplineService';
import TutorService from './../../services/TutorService';

import { useEffect } from "react";

export default function NewDisciplinePage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [active, setActive] = useState("1");
    const [tutorId, setTutorId] = useState("");

    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            
            const response = await TutorService.findAll();

            if(response.success){
                setTutors(response.data);
            }else {
                toast.error("Erro ao carregar os tutores");
            }

            setLoading(false);
        })();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);
        
        if(name.length < 4){
            toast.error("O nome deve ser maior quer 4 digitos");
            setLoading(false);
            return;
        }

        if(description.length < 4){
            toast.error("A descrição deve ser maior quer 4 digitos");
            setLoading(false);
            return;
        }

        if(startDate === ""){
            toast.error("Escolha uma data de inicio");
            setLoading(false);
            return;
        }

        if(endDate === ""){
            toast.error("Escolha uma data de termino");
            setLoading(false);
            return;
        }

        const response = await DisciplineService.save({
            name,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            active: active === "1" ? true : false,
            tutorId: tutorId === "" ? null : tutorId
        });
        
        if(response.success){
            toast.success("disciplina cadastrada com sucesso");
            setName("");
            setDescription("");
            setStartDate("");
            setEndDate("")
            setTutorId("");
            setActive("1")
        }else {
            toast.error("Ocorreu um erro ao salvar a disciplina");
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}
            
            <Form onSubmit={handleSubmit}>
                <Title>Nova Disciplina</Title>

                <label>Nome</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} />

                <label>Descrição</label>
                <Input value={description} onChange={(event) => setDescription(event.target.value)}/>

                <label>Data de Inicio</label>
                <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)}/>

                <label>Data de Termino</label>
                <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>

                <label>Disciplina Ativa ?</label>
                <Select value={active} onChange={(event) => setActive(event.target.value)} name="cars" id="cars">
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </Select>

                <label>Tutor</label>
                <Select value={tutorId} onChange={(event) => setTutorId(event.target.value)} name="cars" id="cars">
                    <option value="">Nenhum tutor selecionado</option>
                    {
                        tutors.map((tutor, index) => {
                            return (<option key={index} value={tutor.id}>{tutor.name}</option>)
                        })
                    }
                </Select>

                <ButtonsContainer>
                    <button className="cancel" onClick={() => history.push('/discipline')}>Voltar</button>
                    <button type="submit" className="save">Salvar</button>
                </ButtonsContainer>
            </Form>
        </Container>
    );
}