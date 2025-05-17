let identificador = 0;
let usuarios = [];
let editando = null;
const formulario = document.querySelector("form");
const tablaBody = document.querySelector("table tbody");


formulario.addEventListener("submit", function(e){
    e.preventDefault()
    const producto = document.getElementById("producto").value;
    const referencia = document.getElementById("referencia").value;
    const cantidad = document.getElementById("cantidad").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value; 

    

    if(producto && referencia && cantidad){
        if(editando !==  null){
            usuarios[editando] = {
                ...usuarios[editando],
                producto,
                referencia: Number(referencia),
                cantidad,
                categoria,
                precio

            };
            editando = null
        } else {
            usuarios.push({id: identificador++, producto, referencia:Number(referencia), cantidad, categoria, precio});
        }
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
        <td>${usuario.id.toString().padStart(2, "0")}</td>
        <td>${usuario.producto}</td>
        <td>${usuario.referencia}</td>
        <td>${usuario.cantidad}</td>
        <td>${usuario.categoria}</td>
        <td>${usuario.precio}</td>
        <td>
            <div class="accionesBtns">
                <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
                <button class="editar" onclick="editarUsuario(${index})">Editar</button>
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
    const usuario = usuarios[index];
    document.getElementById("producto").value = usuario.producto;
    document.getElementById("producto").value = usuario.producto;
    document.getElementById("referencia").value = usuario.referencia;
    document.getElementById("cantidad").value = usuario.cantidad;
    document.getElementById("categoria").value = usuario.categoria;
    document.getElementById("precio").value = usuario.precio;
    editando = index;
    
    const editarBtn = document.querySelectorAll(".editar");

    editarBtn.forEach((btn, i)=> {
        btn.style.background = i === index ? "black" : "";
        btn.style.color = i === index ? "white" : "";
    });
};