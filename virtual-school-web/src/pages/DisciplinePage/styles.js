import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 10px;
`;

export const Title = styled.div`
    margin: 10px 0;
    font-weight: 700;
    font-size: 20px;
    color: #797979;
`;

export const Menu = styled.div`
    margin-top: 10px;
    font-weight: 700;
    font-size: 20px;
    color: #797979;
`;

export const Button = styled.button`
    background-color: #56a04b;
    font-weight: 700;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    border: none;
    transition: 0.3s;
    margin: 5px 10px 30px 10px;

    :hover {
        background-color: #376430;
    }
`;

export const ButtonAction = styled.button`
    background-color: #0062cc;
    
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    border: none;
    transition: 0.3s;
    margin-right: 5px;
    :hover {
        background-color: #0e4786;
    }
`;

export const DeleteButton = styled.button`
    background-color: #a51d2a;
    
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    border: none;
    transition: 0.3s;
    margin-left: 5px;
    :hover {
        background-color: #841f1f;
    }
`;

export const EditButton = styled.button`
    background-color: #c89600;

    color: #fff;
    padding: 5px;
    border-radius: 5px;
    border: none;
    transition: 0.3s;
    :hover {
        background-color: #80661a;
    }
`;