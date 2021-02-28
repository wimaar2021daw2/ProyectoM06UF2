export var data = new Array();

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

export function setSaveData(){
    localStorage.setItem('data', JSON.stringify(data));
}

export function delData(index){
    data.splice(index, 1);
    console.log(data.length);
}