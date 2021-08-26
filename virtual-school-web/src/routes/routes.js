import {
    Switch,
    Route,
} from 'react-router-dom';

import StudentPage from '../pages/StudentPage';
import NewStudentPage from '../pages/NewStudentPage';
import EditStudentPage from '../pages/EditStudentPage';

import TutorPage from '../pages/TutorPage';
import NewTutorPage from '../pages/NewTutorPage';
import EditTutorPage from '../pages/EditTutorPage';

import DisciplinePage from '../pages/DisciplinePage';
import NewDisciplinePage from '../pages/NewDisciplinePage';
import EditDisciplinePage from '../pages/EditDisciplinePage';
import DisciplineDetailsPage from '../pages/DisciplineDetailsPage';

export default function Routes(){
    return (
        <Switch>
            <Route exact path="/" component={StudentPage}/>

            <Route path="/student" component={StudentPage}/>
            <Route path="/new-student" component={NewStudentPage}/>
            <Route path="/edit-student/:id" component={EditStudentPage}/>

            <Route path="/tutor" component={TutorPage}/>
            <Route path="/new-tutor" component={NewTutorPage}/>
            <Route path="/edit-tutor/:id" component={EditTutorPage}/>

            <Route path="/discipline" component={DisciplinePage}/>
            <Route path="/new-discipline" component={NewDisciplinePage}/>
            <Route path="/edit-discipline/:id" component={EditDisciplinePage}/>
            <Route path="/discipline-details/:id" component={DisciplineDetailsPage}/>
        </Switch>
    );
}