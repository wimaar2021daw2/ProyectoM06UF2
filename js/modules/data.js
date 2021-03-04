export var data = new Array();

//funció per mostrar les dades introduïdes per l'usuari en una taula.
export function mostrarDatos(element){
    let tableHTML = '';
    let i = 0;
    if(data.length > 0){
        for(let item of data){
            tableHTML += `
                <tr>
                    <th>${i}</th>
                    <td>${item.nombre}</td>
                    <td>${item.valor}</td>
                    <td><input type="color" value="${item.color}" data-index="${i}"></td>
                    <td><button type="button" data-index="${i}" class="btn btn-danger">Eliminar</button></td>
                </tr>
            `;
            i++;
        }
    }
    element.innerHTML = '';
    element.innerHTML = tableHTML;
    
}
 //funció per guardar les dades
export function setSaveData(){
    localStorage.setItem('data', JSON.stringify(data));
}

//funció per esborrar les dades
export function delData(index){
    data.splice(index, 1);
    console.log(data.length);
}