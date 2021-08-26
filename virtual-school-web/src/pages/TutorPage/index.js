import { Container, Menu, Title, Button, ButtonAction, DeleteButton, EditButton } from "./styles";
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

import { FaInfoCircle, FaTrashAlt, FaUserEdit} from 'react-icons/fa';

import LoadingComponent from "../../components/LoadingComponent";
import DataTable from "../../components/DataTableComponent";
import ModalComponent from "../../components/ModalComponent";

import {toast} from 'react-toastify';

import TutorService from './../../services/TutorService';

export default function TutorPage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [tutorDetail, setTutorDetail] = useState({});

    async function loadAllStudents() {
        const response = await TutorService.findAll();
    
        if(response.success) setData(response.data);
        else toast.error("Erro ao carregar os tutores");
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            loadAllStudents();
            setLoading(false);
        })();
    }, []);

    async function deleteById(id) {
        const confirmResponse = window.confirm("Deseja realmente deletar esse tutor?");
        if(confirmResponse){
            setLoading(true);
            const response = await TutorService.deleteById(id);


            if(response.success){
                loadAllStudents();
                toast.success("Tutor deletado com sucesso");
            }else{
                toast.error("Erro ao deletar o tutor");
            }

            setLoading(false);
        }
    }

    function handlerHideModal(){
        setTutorDetail({});
        setShowModal(false);
    }

    function showStudentDetail(id){
        setLoading(true);   
        
        const findTutor = data.find(tutor => tutor.id === id);
        setTutorDetail(findTutor);

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
                                    pathname: `/edit-tutor/${value}`,
                                    tutor: data.find(tutor => tutor.id === value)
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
            name: "employeeCode",
            label: "Código do Funcionário",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <Container>
            {loading && <LoadingComponent/>}
            <Title>Tutores</Title>
                <Menu>
                    <Button onClick={() => history.push("/new-tutor")}>Adicionar Novo Tutor</Button>
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
                        <p className="modal-title">Informações Do Tutor</p>
                        <p><strong>Nome:</strong> {tutorDetail.name}</p>
                        <p><strong>Email:</strong> {tutorDetail.email}</p>
                        <p><strong>Código Do Funcionario:</strong> {tutorDetail.employeeCode}</p>
                        <p><strong>Senha:</strong> {tutorDetail.password}</p>
                    </div>
                </ModalComponent>
            }
        </Container>    
    );
}