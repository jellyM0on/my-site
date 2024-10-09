import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addNotations } from './components/addNotations';


function component() {
    const element = document.createElement('div');
    element.textContent = 'test2'; 
   
    
    return element;
  }

  addNotations();
  
