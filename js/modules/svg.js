export function ejes(setter=true){
    let svgEjes = `
        <line x1="10%" y1="0" x2="10%" y2="90%" style="stroke:rgb(0,0,0);stroke-width:2" />
        <line x1="10%" y1="90%" x2="100%" y2="90%" style="stroke:rgb(0,0,0);stroke-width:2" />
    `;

    let a = 0;

    if(setter){
        a = 90;
        for(let i=0; i<5; i++){
            svgEjes += `
                <line x1="8%" y1="${a}%" x2="10%" y2="${a}%" style="stroke:rgb(0,0,0);stroke-width:1" />
            `;
            a -= 90/5;
        }
    }else{
        a = 10;
        for(let i=0; i<5; i++){
            svgEjes += `
                <line x1="${a}%" y1="90%" x2="${a}%" y2="92%" style="stroke:rgb(0,0,0);stroke-width:1" />
            `;
            a += 90/5;
        }
    }

    return svgEjes;
}

export function mostrarValores(value, setter=true, type=true){
    let svgNumbers = '';
    let maxNumber = parseFloat(value);
    let result = 0;
    let a = 0;

    if(maxNumber < 5) maxNumber = 5;
    if(!type) maxNumber = 100;

    if(setter){
        a = 90;
        for(let i=0; i<5; i++){
            result = Math.trunc(maxNumber/4*i);
            if(i == 4) result = maxNumber;
            if(i == 0) result = 0;
            if(!type) result += '%';
            svgNumbers += `
                <text text-anchor="end" x="7%" y="${a}%" font-size="12">${result}</text>
            `;
            a -= 90/5;
        }
    }else{
        a = 10;
        for(let i=0; i<5; i++){
            result = Math.trunc(maxNumber/4*i);
            if(i == 4) result = maxNumber;
            if(i == 0) result = 0;
            if(!type) result += '%';
            svgNumbers += `
                <text text-anchor="middle" x="${a}%" y="95%" font-size="12">${result}</text>
            `;
            a += 90/5;
        }
    }

    return svgNumbers;

}