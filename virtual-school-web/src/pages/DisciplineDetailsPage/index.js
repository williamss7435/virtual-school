import { Container, Menu, Title, Button, ButtonAction, DeleteButton, EditButton } from "./styles";
import { useState, useEffect } from "react";
import {useHistory, useLocation} from 'react-router-dom';

import { FaInfoCircle, FaTrashAlt, FaUserEdit} from 'react-icons/fa';

import LoadingComponent from "../../components/LoadingComponent";
import DataTable from "../../components/DataTableComponent";
import ModalComponent from "../../components/ModalComponent";

import {toast} from 'react-toastify';

import DisciplineService from './../../services/DisciplineService';

export default function DisciplineDetailsPage(){
    const history = useHistory();
    const state = useLocation();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});

    const [id, setId] = useState(state.discipline ? state.discipline.id : null);
    const [name, setName] = useState(state.discipline ? state.discipline.name : null);

    async function loadAllStudents() {
        const response = await DisciplineService.findAllByDisciplineId(id);
    
        if(response.success) setData(response.data);
        else toast.error("Erro ao carregar os estudantes");
    }

    useEffect(() => {
        (async () => {
            setLoading(true);

            if(id == null) {
                history.push("/discipline")
            }

            loadAllStudents();
            setLoading(false);
        })();
    }, []);

    async function deleteById(id) {
        const confirmResponse = window.confirm("Deseja realmente deletar essa disciplina?");
        if(confirmResponse){
            setLoading(true);
            const response = await DisciplineService.deleteById(id);


            if(response.success){
                loadAllStudents();
                toast.success("disciplina deletada com sucesso");
            }else{
                toast.error("Erro ao deletar a disciplina");
            }

            setLoading(false);
        }
    }

    function handlerHideModal(){
        setStudentDetail({});
        setShowModal(false);
    }

    function showStudentDetail(id){
        setLoading(true);   
        
       
        setLoading(false);
        setShowModal(true);
    }

    const columns = [
        {
            name: "name",
            label: "Nome",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Descrição",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <Container>
            {loading && <LoadingComponent/>}
            <Title>Detalhes da Disciplina: <strong>{name}</strong></Title>
                <Menu>
                    <Button onClick={() => history.push("/discipline")}>Voltar</Button>
                    <Button onClick={() => showStudentDetail()}>Adicionar Um Novo Aluno</Button>
                </Menu>
                <DataTable
                    title={"Alunos que participam da disciplina"}
                    data={data}
                    columns={columns}
                    options={{
                        filterType: 'checkbox',
                        selectableRows: false
                    }}
                />
            {showModal &&
                <ModalComponent close={handlerHideModal}>
                    <div className="card">
                        <p className="modal-title">Informações Do Estudante</p>
                        <p><strong>Nome:</strong> {studentDetail.name}</p>
                        <p><strong>Email:</strong> {studentDetail.email}</p>
                        <p><strong>Matricula:</strong> {studentDetail.registration}</p>
                        <p><strong>Senha:</strong> {studentDetail.password}</p>
                    </div>
                </ModalComponent>
            }
        </Container>    
    );
}