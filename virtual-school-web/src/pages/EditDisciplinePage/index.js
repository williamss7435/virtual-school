import { useState } from "react";
import {useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {parseISO, format} from 'date-fns';
import LoadingComponent from "../../components/LoadingComponent";

import {Container, Title, Form, Input, ButtonsContainer, Select} from "./styles.js";

import DisciplineService from './../../services/DisciplineService';
import TutorService from './../../services/TutorService';

import { useEffect } from "react";

export default function NewDisciplinePage(){
    const history = useHistory();
    const state = useLocation();

    const [loading, setLoading] = useState(false);
    
    const [id, setId] = useState(state.discipline ? state.discipline.id : null);
    const [name, setName] = useState(state.discipline ? state.discipline.name : null);
    const [description, setDescription] = useState(state.discipline ? state.discipline.description : null);
    
    const [startDate, setStartDate] = useState(
        state.discipline ? 
        format(parseISO(state.discipline.startDate), "yyyy-MM-dd") 
        : null);
    
    const [endDate, setEndDate] = useState(
        state.discipline ? 
        format(parseISO(state.discipline.endDate), "yyyy-MM-dd") 
        : null);

    const [active, setActive] = useState(state.discipline ? state.discipline.active : null);
    const [tutorId, setTutorId] = useState(
        state.discipline ? 
        state.discipline.tutor ? state.discipline.tutor.id : ""
        : null);

    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            if(id == null) {
                history.push("/discipline")
            }

            const response = await TutorService.findAll();

            if(response.success){
                setTutors(response.data);
            }else {
                toast.error("Erro ao carregar os tutores");
            }

            setLoading(false);
        })();
    }, [history, id]);

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

        const response = await DisciplineService.replace(id, {
            name,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            active: active === "1" ? true : false,
            tutorId: tutorId === "" ? null : tutorId
        });
        
        if(response.success){
            toast.success("disciplina editada com sucesso");
        }else {
            toast.error("Ocorreu um erro ao editar a disciplina");
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}
            
            <Form onSubmit={handleSubmit}>
                <Title>Editar Disciplina</Title>

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