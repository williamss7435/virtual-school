
import { Container, Link } from "./styles";

export default function NavbarComponent(){
    return (
        <Container>
            <Link to="/student">Estudantes</Link><br></br>
            <Link to="/tutor">Tutores</Link>
            <Link to="/discipline">Disciplinas</Link>
        </Container>
    );
}