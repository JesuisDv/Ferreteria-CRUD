let identificador = 0;
let usuarios = [];

const formulario = document.querySelector("form")
const tablaBody = document.querySelector("table tbody")

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    const producto = document.getElementById("producto").value;
    const referencia = document.getElementById("referencia").value;
    const cantidad = document.getElementById("cantidad").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value; 

    if(producto && referencia && cantidad){
        usuarios.push({producto, referencia:Number(referencia), cantidad, categoria, precio});
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
        <td>${usuario.producto}</td>
        <td>${usuario.referencia}</td>
        <td>${usuario.cantidad}</td>
        <td>${usuario.categoria}</td>
        <td>${usuario.precio}</td>
        <td>
            <div class="accionesBtns">
                <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
                <button class="editar" onclick="">Editar</button>
            </div>
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