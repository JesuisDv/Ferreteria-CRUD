let identificador = 0;
let usuarios = [];

const formulario = document.querySelector("form")
const tablaBody = document.querySelector("table tbody")

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const telefono = document.getElementById("telefono").value;

    if(nombre && edad && telefono){
        usuarios.push({nombre, edad:Number(edad), telefono});
        this.reset();
        mostrarUsuarios()
    }
});

function mostrarUsuarios(){
    
    tablaBody.innerHTML="";

    usuarios.forEach((usuario, index)=>{

        const fila = document.createElement("tr");

        fila.innerHTML=``

        fila.innerHTML=`
        <td>${(++identificador).toString().padStart(2, "0")}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.edad}</td>
        <td>${usuario.telefono}</td>
        <td>
            <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
        </td>
        `
        tablaBody.appendChild(fila);
    })
}

function eliminarUsuario(index){
    usuarios.splice(index,1);
    mostrarUsuarios();
}

function editarUsuario(index){
    
};