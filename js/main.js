import { Barra, webDataLoad } from './modules/prototypes.js';
import { data, mostrarDatos, delData, setSaveData } from './modules/data.js';
import { ejes, mostrarValores, dlImage } from './modules/svg.js';


function main(){
    let docOrientation = document.getElementById('orientation');
    let docDataType = document.getElementById('dataType');
    let docMaxValue = document.getElementById('maxValue');
    let svgGraph = document.getElementById('svg-graph');

    webDataLoad();
    loadObjects();

    function drawGraph(){
        let setter = true;
        let type = true;

        if(docOrientation.value == 'vertical'){
            setter = true;
        }else if(docOrientation.value == 'horizontal'){
            setter = false;
        }

        if(docDataType.value == 'numeric'){
            type = true;
        }else if(docDataType.value == 'porcentaje'){
            type = false;
        }

        svgGraph.innerHTML = '';
        svgGraph.innerHTML += mostrarBarras(docMaxValue.value, setter);
        svgGraph.innerHTML += ejes(setter);
        svgGraph.innerHTML += mostrarValores(docMaxValue.value, setter, type);
    }

    drawGraph();

    function detectaBoton(){
        let deleteBTN = document.getElementById('dataShow').querySelectorAll('button');
        if(deleteBTN.length > 0){
            deleteBTN.forEach(element => {
                element.addEventListener('click', ()=>{
                    delData(parseInt(element.dataset.index));
                    mostrarDatos(document.getElementById('dataShow'));
                    setSaveData();
                    disableForm();
                    detectarElementos();
                    drawGraph();
                });
            });
        }
    }

    function detectaColor(){
        let inputColor = document.getElementById('dataShow').querySelectorAll('input[type="color"]');
        if(inputColor.length > 0){
            inputColor.forEach(element => {
                element.addEventListener('input', ()=>{
                    data[parseInt(element.dataset.index)].color = element.value;
                    setSaveData();
                    drawGraph();
                });
            });
        }
    }

    function detectarElementos(){
        detectaColor();
        detectaBoton();
    }

    function dataMaxSet(number){
        let max = parseFloat(document.getElementById('maxValue').value);
        if(number > max){
            number = max;
        }

        return number;
    }

    function disableForm(){
        let inputText = document.getElementById('nombre');
        let inputNumber = document.getElementById('valor');
        let inputSubmit = document.getElementById('addData');
        if(data.length == 7){
            inputText.setAttribute('disabled', '');
            inputNumber.setAttribute('disabled', '');
            inputSubmit.setAttribute('disabled', '');
        }else{
            if(!inputText.getAttribute('disabled')) inputText.removeAttribute('disabled');
            if(!inputNumber.getAttribute('disabled')) inputNumber.removeAttribute('disabled');
            if(!inputSubmit.getAttribute('disabled')) inputSubmit.removeAttribute('disabled');
        }
    }

    document.getElementById('elementAdd').addEventListener('submit', (element)=>{
        element.preventDefault();

        let formData = new FormData(document.getElementById('elementAdd'));
        let valor = dataMaxSet(parseFloat(formData.get('value')));
        let barra = new Barra(formData.get('name'), valor, '#176ed1');

        addData(barra);

        document.getElementById('elementAdd').reset();

        mostrarDatos(document.getElementById('dataShow'));
        disableForm();
        detectarElementos();
        setSaveData();
        drawGraph();
    });

    docOrientation.addEventListener('input', drawGraph);
    docDataType.addEventListener('input', drawGraph);

    docMaxValue.addEventListener('input', ()=>{
        data.length = 0;
        localStorage.setItem('data', JSON.stringify(data));
        mostrarDatos(document.getElementById('dataShow'));
        drawGraph();
    });

    detectarElementos();
    disableForm();
}

function addData(barra){
    if(data.length < 7){
        data.push(barra);
    }
}

function loadObjects(){
    function generateObjects(savedData){
        savedData.forEach(element => {
            data.push(new Barra(element.nombre, element.valor, element.color));
        });

        mostrarDatos(document.getElementById('dataShow'));
    }

    if(localStorage.getItem('data')){
        generateObjects(JSON.parse(localStorage.getItem('data')));
    }else{
        localStorage.setItem('data', JSON.stringify(data));
        generateObjects(JSON.parse(localStorage.getItem('data')));
    }
}

function mostrarBarras(max, setter=true){
    max = parseFloat(max);
    let svgString = '';
    let i = 1;

    if(!setter) i = 8.5;

    for(let item of data){
        let percentage = item.valor/max*100;
        let heightWidth = (72*percentage)/100;
        if(setter){
            svgString += `
                <rect width="5%" height="${heightWidth}%" x="${i*10+5}%" y="${90-heightWidth}%" fill="${item.color}"></rect>
                <text text-anchor="middle" x="${i*10+7.5}%" y="95%" font-size="12">${item.nombre}</text>
            `;
            i++;
        }else{
            svgString += `
                <rect width="${heightWidth}%" height="5%" x="10%" y="${i*10-5}%" fill="${item.color}"></rect>
                <text x="12%" y="${i*10-5}%" font-size="12">${item.nombre}</text>
            `;
            i--;
        }
    }

    return svgString;
}

window.addEventListener('load', dlImage, true);
window.addEventListener('load', main, true);