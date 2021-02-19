import { prueba } from './modules/classes.js';

var data = new Array();

function main(){
    var deleteBTN = document.getElementById('dataShow').querySelectorAll('button');

    function detectaBoton(){
        deleteBTN = document.getElementById('dataShow').querySelectorAll('button');
        if(deleteBTN.length > 0){
            deleteBTN.forEach(element => {
                element.addEventListener('click', ()=>{
                    delData(parseInt(element.dataset.index));
                    mostrarDatos();
                });
            });
        }
    }

    detectaBoton();

    function mostrarDatos(){
        let tableHTML = '';
        let i = 0;
        if(data.length > 0){
            for(let item of data){
                tableHTML += `
                    <tr>
                        <th>${i}</th>
                        <td>${item.name}</td>
                        <td>${item.value}</td>
                        <td><button type="button" data-index="${i}" class="btn btn-danger">Eliminar</button></td>
                    </tr>
                `;
                i++;
            }
        }
        document.getElementById('dataShow').innerHTML = '';
        document.getElementById('dataShow').innerHTML = tableHTML;
        detectaBoton();
    }

    document.getElementById('elementAdd').addEventListener('submit', (element)=>{
        element.preventDefault();
        let formData = new FormData(document.getElementById('elementAdd'));
        addData(
            formData.get('name'), 
            parseInt(formData.get('value'))
        );
        document.getElementById('elementAdd').reset();
        mostrarDatos();
    });
}

function addData(name, value){
    data.push({name: name, value: value});
}

function delData(index){
    data.splice(index, 1);
}

window.addEventListener('load', main, true);