import projects from '../assets/projects.json'; 

const requireImages = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

function addProject(img, imgAlt, title, link,  stack, description){
    return `
    <li class="col-xs-8 col-md-6">
        ${img != 0 ?  `<img class="img-fluid" src=${requireImages(`./${img}.png`)} alt=${imgAlt}></img>` : `` }
        <div class="py-1 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center">
                <p class="m-0 p-0 fw-bold">${title}</p>
                <a href=${link} target="_blank"><img src=${requireImages('./github.svg')} alt="Github"></a>
            </div>
                            
            <ul class="list-unstyled d-flex flex-row">
               ${stack.map((s =>  `<li><img src=${requireImages(`./${s}.svg`)} alt="${s} Logo"></li>`)).join('')}
            </ul>
                                    
            <p>${description}</p>
        </div>
    </li>`;
}

function addProjects(){
    const projectList = projects.projects; 
    let projectHtml = ''; 
    projectList.forEach(p => {
        projectHtml += addProject(p.img, p.imgAlt, p.title, p.link, p.stack, p.description); 
    });

    const projectContainer = document.querySelector('#project-container');
    projectContainer.innerHTML = projectHtml; 
}

export {addProjects}; 

