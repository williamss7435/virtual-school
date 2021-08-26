import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 150px;
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: 25px;
    color: #797979;
    margin-bottom: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    margin-top: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 1px;

    label {
        color: #797979;
        font-weight: bold;
        margin-bottom: 5px;
    }
`;

export const Input = styled.input`
    border: solid 1px #f4f4f4;
    height: 30px;
    color: #5e5e5e;
    display: flex;
    padding-left: 5px;
    margin-bottom: 30px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    button {
        border-radius: 5px;
        border: none;
        padding: 10px;
        color: #fff;
        width: 200px;
        font-weight: bold;
    }

    button.cancel {
        background-color: #0062cc;
    }

    button.save {
        background-color: #208637;
    }
`;