import { Container, Menu, Title, Button, ButtonAction, DeleteButton, EditButton } from "./styles";
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

import { FaInfoCircle, FaTrashAlt, FaUserEdit} from 'react-icons/fa';

import LoadingComponent from "../../components/LoadingComponent";
import DataTable from "../../components/DataTableComponent";
import ModalComponent from "../../components/ModalComponent";

import {toast} from 'react-toastify';

import DisciplineService from './../../services/DisciplineService';

export default function DisciplinePage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});

    async function loadAllDiscipline() {
        const response = await DisciplineService.findAll();
    
        if(response.success) setData(response.data);
        else toast.error("Erro ao carregar os estudantes");
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            loadAllDiscipline();
            setLoading(false);
        })();
    }, []);

    async function deleteById(id) {
        const confirmResponse = window.confirm("Deseja realmente deletar essa disciplina?");
        if(confirmResponse){
            setLoading(true);
            const response = await DisciplineService.deleteById(id);


            if(response.success){
                loadAllDiscipline();
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

    const columns = [
        {
            name: "id",
            label: " ",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <ButtonAction onClick={() => history.push({
                                    pathname: `/discipline-details/${value}`,
                                    discipline: data.find(discipline => discipline.id === value)
                                })}>
                                <FaInfoCircle/>
                            </ButtonAction>
                            <EditButton onClick={() => 
                                history.push({
                                    pathname: `/edit-discipline/${value}`,
                                    discipline: data.find(discipline => discipline.id === value)
                                }) 
                            }>
                                <FaUserEdit/>
                            </EditButton>
                            <DeleteButton onClick={() => deleteById(value) }>
                                <FaTrashAlt/>
                            </DeleteButton>
                        </>  
                    )
                },
                sort: false,
            }
        },
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
            <Title>Disciplinas</Title>
                <Menu>
                    <Button onClick={() => history.push("/new-discipline")}>Adicionar Nova Disciplina</Button>
                </Menu>
                <DataTable
                    title={" "}
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