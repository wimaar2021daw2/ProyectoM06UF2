export var Barra = function(nombre, valor, color){
    this.nombre = nombre;
    this.valor = valor;
    this.color = color;
}

export function webDataLoad(){
    var orientation = localStorage.getItem('orientation');
    var dataType = localStorage.getItem('dataType');
    var maxValue = localStorage.getItem('maxValue');
    
    let docOrientation = document.getElementById('orientation');
    let docDataType = document.getElementById('dataType');
    let docMaxValue = document.getElementById('maxValue');

    function loadData(){
        switch(orientation){
            case 'vertical':
                document.getElementById('orientation-vertical').setAttribute('selected', '');
                break;
            case 'horizontal':
                document.getElementById('orientation-horizontal').setAttribute('selected', '');
                break;
        }

        switch(dataType){
            case 'numeric':
                document.getElementById('dataType-numeric').setAttribute('selected', ''); 
                break;
            case 'porcentaje': 
                document.getElementById('dataType-porcentaje').setAttribute('selected', '');
                break;
        }

        docMaxValue.setAttribute('value', maxValue.toString());
    }

    if(orientation && dataType && maxValue){
        loadData();
    }else{
        orientation = 'vertical';
        dataType = 'integer';
        maxValue = 100;

        localStorage.setItem('orientation', orientation);
        localStorage.setItem('dataType', dataType);
        localStorage.setItem('maxValue', maxValue);

        loadData();
    }

    docOrientation.addEventListener('input', ()=>{
        orientation = docOrientation.value;
        localStorage.setItem('orientation', orientation);
    });

    docDataType.addEventListener('input', ()=>{
        dataType = docDataType.value;
        localStorage.setItem('dataType', dataType);
    });

    docMaxValue.addEventListener('input', ()=>{
        maxValue = docMaxValue.value;
        localStorage.setItem('maxValue', maxValue);
    });
}