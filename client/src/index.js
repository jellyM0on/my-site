import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addNotations } from './components/addNotations';
import { addProjects } from './components/addProjects';

//handle redirection
if (window.location.hostname !== 'ylana-ong.com') {
    window.location.href = 'ylana-ong.com' + window.location.pathname;
}

addProjects(); 
addNotations();

