import { annotate } from 'rough-notation';



function addNotation(element, type, color, brackets){
    const elements = document.querySelectorAll(`${element}`);
    elements.forEach((e) => {
        const annotation = annotate(e, { type: `${type}`, color: `${color}`, multiline: true, animationDuration: 1000});
        annotation.show();
    })
}

function addNotations(){
//nt-highlight main
    addNotation('.nt-highlight-main', 'highlight', '#ffafcc');
    setTimeout( () => addNotation('.nt-highlight', 'highlight', '#bde0fe'), 2000);
    setTimeout( () => addNotation('.nt-circle', 'circle', '#ffc8dd'), 3000);
    setTimeout( () => addNotation('.nt-underline', 'underline', '#a2d2ff'), 1000);
    setTimeout( () => addNotation('.nt-box', 'box', '#cdb4db'), 4000);
}
export {addNotations}; 