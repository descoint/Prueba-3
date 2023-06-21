var cargarTabla = (listadoNuevo)=>{
    let eSBtnAccion = document.getElementById("sBtnAccion");
    let eContenedorTabla = document.getElementById("contenedorTabla");
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eNumero = document.getElementById("numero");
    let eMail = document.getElementById("email")
    
    
    render = "<table>"
    render += "<tr><th>Nombre</th><th>Apellido</th><th>Accion</th></tr>"
    for (let i = 0; i < listadoNuevo.length; i++) {
        const element = listadoNuevo[i];
        render+="<tr>"
        render+="<td>"+element.nombre+"</td>";
        render+="<td>"+element.apellido+"</td>";
        render+="<td>"+element.numero+"</td>";
        render+="<td>"+element.email+"</td>"
        render+="<td>"
        render+="<button id='btnEditar"+i+"'>Editar</button>"
        render+="<button id='btnEliminar"+i+"'>Eliminar</button>"
        render+="</td>"
        render+="</tr>"
    }
    render+="</table>"
    eContenedorTabla.innerHTML = render;
    for (let i = 0; i < listadoNuevo.length; i++) {
        const element = listadoNuevo[i];
        var eBtnEditar = document.getElementById("btnEditar"+i);
        eBtnEditar.addEventListener("click",()=>{
            let sBtn = "<button type='button' id='btnEditar' value='"+i+"'>Editar</button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEditarUp = document.getElementById("btnEditar");
            console.log(eBtnEditarUp)
            eBtnEditarUp.addEventListener('click',()=>modificar(listadoNuevo)) 


            eNombre.value = element.nombre;
            eApellido.value = element.apellido;
            eNumero.value = element.numero;
            eMail.value = element.email
        })

        var eBtnEliminar = document.getElementById("btnEliminar"+i);
        eBtnEliminar.addEventListener("click",()=>{
            let sBtn = "<button type='button' id='btnEliminar' value='"+i+"'>Eliminar</button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEliminarUp = document.getElementById("btnEliminar");
            console.log(eBtnEliminarUp)
            eBtnEliminarUp.addEventListener('click',()=>eliminar(listadoNuevo)) 


            eNombre.value = element.nombre;
            eApellido.value = element.apellido;
            eNumero.value = element.numero;
            eMail.value = element.email
        })
        
        
    }
}
// aplica el boton editar y para cambiar los antiguos elementos por los nuevos
var modificar = (listadoNuevo)=>{
    console.log("loooog")
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eNumero = document.getElementById("Numero");
    let eMail = document.getElementById("email")
    let eBtnEditarUp = document.getElementById("btnEditar");

    console.log("Editado");
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let numero = eNumero.value;
    let email = eMail.value;
    let indice = eBtnEditarUp.value;
    console.log(nombre);
    console.log(apellido);
    console.log(numero);
    console.log(email);
    console.log(indice);
    listadoNuevo[indice].nombre = nombre;
    listadoNuevo[indice].apellido = apellido;
    listadoNuevo[indice].numero = numero;
    listadoNuevo[indice].email = email;
    localStorage.setItem('alumnos',JSON.stringify(listadoNuevo))
    cargarTabla(listadoNuevo);
}

//selecciona el elemento para eliminar aplica denuevo para eliminar definitivamente el elemento
var eliminar = (listadoNuevo)=>{
    let eBtnEliminarUp = document.getElementById("btnEliminar");
    let indice = eBtnEliminarUp.value;
    let lista = listadoNuevo.filter((p)=>p.id!=indice)
    let listaFinal = lista.map((p,index)=>{return {...p,'id':index}})

    localStorage.setItem('alumnos',JSON.stringify(listaFinal))
    cargarTabla(listaFinal)
}

// si los campos de nombre y apellido estan vacios salta un texto de que no sea completado el campo
function validacionForm() {
    form.lastElementChild.innerHTML = "";
    let condicion = true;
    listInputs.forEach((element) => {
      element.lastElementChild.innerHTML = "";
    });
  
    if (nombre.value.length < 1 || nombre.value.trim() == "") {
      mostrarMensajeError("nombre", "Nombre no valido*");
      condicion = false;
    }
    if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
      mostrarMensajeError("apellido", "Apellido no valido");
      condicion = false;}
    return condicion   
}
// registra la tabla
var registrar = ()=>{
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eNumero = document.getElementById("numero");
    let eMail = document.getElementById("email");
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let numero = eNumero.value;
    let email = eMail.value;
    console.log(nombre);
    console.log(apellido);
    console.log(numero);
    console.log(email);
    let listadoAntiguoStr = localStorage.getItem("alumnos");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    console.log(listaAntiguo)
    if(listaAntiguo==null){
        let persona = {"id":0,"nombre":nombre,"apellido":apellido,"numero":numero,"email":email};
        var listadoNuevo = [persona]
    }else{
        let persona = {"id":listaAntiguo.length,"nombre":nombre,"apellido":apellido,"numero":numero,"email":email};
        var listadoNuevo = [...listaAntiguo,persona]
    }

    function mostrarMensajeError(claseInput, mensaje) {
        let elemento = document.querySelector(`.${claseInput}`);
        elemento.lastElementChild.innerHTML = mensaje;
      }
    console.log(listadoNuevo)
    localStorage.setItem("alumnos",JSON.stringify(listadoNuevo));
    cargarTabla(listadoNuevo)

    
}
//obtiene los datos de listados antiguos
var obtenerDatos = ()=>{
    let listadoAntiguoStr = localStorage.getItem("alumnos");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    cargarTabla(listaAntiguo)
}
document.getElementById("btn").addEventListener("click",registrar)
addEventListener('load',obtenerDatos)
