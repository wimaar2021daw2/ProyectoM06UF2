import { Barra, webDataLoad } from './modules/prototypes.js';
import { data, mostrarDatos, delData, setSaveData } from './modules/data.js';
import { ejes, mostrarValores } from './modules/svg.js';


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
window.addEventListener('load', main, true);