import styled from 'styled-components';
import { Link as LinkReact } from "react-router-dom";

export const Container = styled.nav`
    background-color: #56a04b;
    display: flex;
    height: 30px;
    align-items: center;
    padding-bottom: 10px;
`;

export const Link = styled(LinkReact)`
    color: #fff;
    margin-left: 10px;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
`;