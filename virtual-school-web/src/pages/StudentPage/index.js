import { Container, Menu, Title, Button, ButtonAction, DeleteButton, EditButton } from "./styles";
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

import { FaInfoCircle, FaTrashAlt, FaUserEdit} from 'react-icons/fa';

import LoadingComponent from "../../components/LoadingComponent";
import DataTable from "../../components/DataTableComponent";
import ModalComponent from "../../components/ModalComponent";

import {toast} from 'react-toastify';

import StudentService from './../../services/StudentService';

export default function StudentPage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});

    async function loadAllStudents() {
        const response = await StudentService.findAll();
    
        if(response.success) setData(response.data);
        else toast.error("Erro ao carregar os estudantes");
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            loadAllStudents();
            setLoading(false);
        })();
    }, []);

    async function deleteById(id) {
        const confirmResponse = window.confirm("Deseja realmente deletar esse estudante?");
        if(confirmResponse){
            setLoading(true);
            const response = await StudentService.deleteById(id);


            if(response.success){
                loadAllStudents();
                toast.success("Estudante deletado com sucesso");
            }else{
                toast.error("Erro ao deletar o estudante");
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
        
        const findStudent = data.find(student => student.id === id);
        setStudentDetail(findStudent);

        setLoading(false);
        setShowModal(true);
    }

    const columns = [
        {
            name: "id",
            label: " ",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <ButtonAction onClick={() => showStudentDetail(value) }>
                                <FaInfoCircle/>
                            </ButtonAction>
                            <EditButton onClick={() => 
                                history.push({
                                    pathname: `/edit-student/${value}`,
                                    student: data.find(student => student.id === value)
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
            name: "registration",
            label: "Matricula",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <Container>
            {loading && <LoadingComponent/>}
            <Title>Estudantes</Title>
                <Menu>
                    <Button onClick={() => history.push("/new-student")}>Adicionar Novo Aluno</Button>
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