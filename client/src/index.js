import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { annotate } from 'rough-notation';


function component() {
    const element = document.createElement('div');
    element.textContent = 'test2'; 
   
    
    return element;
  }
  
  document.body.appendChild(component());
  console.log('test');