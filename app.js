async function obtenerDatos(){
    try{
        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => respuesta.json())
        .then(data => {
            let cuerpoTabla = document.getElementById("tblContenido");
            let salida = "";
            for (let elemento of data.dispositivos) {
                salida += `
                        <tr>
                            <td>${elemento.id}</td>
                            <td>${elemento.marca}</td>
                            <td>${elemento.modelo}</td>
                            <td>${elemento.color}</td>
                            <td>${elemento.almacenamiento} GB</td>
                            <td>${elemento.procesador}</td>
                        </tr>
                          `;
            }
            cuerpoTabla.innerHTML = salida;
        })
        .catch(error => { throw new Error("Error en la solicitud: " + error)})       
    }catch(error){
        console.error(error);
    }
}

async function consultarUno(){
    try {
        let id = document.getElementById('txtConsulta').value;

        if(id === ''){
            alert('No se ha ingresado un ID');
            return;
        }

        axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id)
        .then(respuesta => {
            let dispositivo = respuesta.data;
            document.getElementById('consultaNombre').value = dispositivo.marca;
            document.getElementById('consultaModelo').value = dispositivo.modelo;
            document.getElementById('consultaColor').value = dispositivo.color;
            document.getElementById('consultaAlmacenamiento').value = dispositivo.almacenamiento;
            document.getElementById('consultaProcesador').value = dispositivo.procesador;
        })
        .catch(error => { throw new Error("Error en la solicitud: " + error)})
    }catch(error){
        console.error(error);
    }
}

async function agregarUno(){
    try{
        let marca = document.getElementById('inputMarca').value;
        let modelo = document.getElementById('inputModelo').value;
        let color = document.getElementById('inputColor').value;
        let almacenamiento = document.getElementById('inputAlamcenamiento').value;
        let procesador = document.getElementById('inputProcesador').value;

        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos', {
            method: 'POST',
            headers: {
                contentType: 'application/json'
            },
            body: JSON.stringify({
                marca: marca,
                modelo: modelo,
                color: color,
                almacenamiento: almacenamiento,
                procesador: procesador
            })
        })
        .then(respuesta => respuesta.json())
        .then(data => {
            obtenerDatos();
            //No se muestra el nuevo archivo en la lista principal porque la API de JSON Server no lo permite
            alert('Dispositivo agregado correctamente');
        })
        .catch(error => { throw new Error("Error en la solicitud: " + error)})
    }catch(error){
        console.error(error);
    }
}

async function modificarUno() {
    try{
        let id = document.getElementById('txtConsulta').value;
        let nombre = document.getElementById('consultaNombre').value;
        let modelo = document.getElementById('consultaModelo').value;
        let color = document.getElementById('consultaColor').value;
        let almacenamiento = document.getElementById('consultaAlmacenamiento').value;
        let procesador = document.getElementById('consultaProcesador').value;

        if (nombre === ''){
            alert('El registro a modificar no esta completo');
            return;
        }

        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                data: {
                    modelo: modelo,
                    color: color,
                    almacenamiento: almacenamiento,
                    procesador: procesador
                }
            })
        })
        .then(respuesta => respuesta.json())
        .then(data => {
            alert('Dispositivo modificado correctamente');
            obtenerDatos();
        })
        .catch(error => { throw new Error("Error en la solicitud: " + error)})
    }catch(error){
        console.error(error);
    }
}

async function eliminarUno() {
    try{
        let id = document.getElementById('txtConsulta').value;

        if(id === ''){
            alert('No se ha ingresado un ID');
            return;
        }

        axios.delete('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id)
        .then(respuesta => {
            alert(`Dispositivo con ID ${id} eliminado correctamente`);
            document.getElementById('txtConsulta').value = '';
            document.getElementById('consultaNombre').value = '';
            document.getElementById('consultaModelo').value = '';
            document.getElementById('consultaColor').value = '';
            document.getElementById('consultaAlmacenamiento').value = '';
            document.getElementById('consultaProcesador').value = '';
            
            obtenerDatos();  
        })  
    }catch(error){
        console.error(error);
    }
}



