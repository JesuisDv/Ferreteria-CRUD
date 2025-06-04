const supaBaseURL = "https://fncglcyjobntxyzenzfv.supabase.co";
const supaBaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuY2dsY3lqb2JudHh5emVuemZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjUxMDgsImV4cCI6MjA2NDUwMTEwOH0.ChvlBrd5xrbYQX1g60syFgxuV2yWTCUwOA7R0fdzGDQ"

const supabase = window.supabase.createClient(supaBaseURL, supaBaseKEY);

let productos = [];
let editando = null;
const formulario = document.querySelector("form");
const tablaBody = document.querySelector("table tbody");

// Agregar un evento de carga para obtener los productos al inicio
async function cargarProductos() {
    const { data, error } = await supabase
        .from('Ferreteria')
        .select('*')

    if (error) {
        console.error("Error al cargar los productos: ", error);
    } else {
        productos = data.map(item => ({
            id: item.id,
            producto: item.Producto,
            referencia: item.Referencia,
            cantidad: item.Cantidad,
            categoria: item.Categoria,
            precio: item.Precio
        }));
        mostrarProductos();
    }
}

async function guardarProductosSP(productoObj) {
    const { error } = await supabase
        .from   ('Ferreteria')
        .insert([{
            Producto: productoObj.producto,
            Referencia: productoObj.referencia,
            Cantidad: productoObj.cantidad,
            Categoria: productoObj.categoria,
            Precio: productoObj.precio
        }]);
    
    if ( error ){
        console.error("Error al guardar el producto: ", error);
    }else {
        cargarProductos();
    }
}

async function actualizarProductosSP(id, productoObj) {
    const { error } = await supabase
        .from('Ferreteria')
        .update([{
            Producto: productoObj.producto,
            Referencia: productoObj.referencia,
            Cantidad: productoObj.cantidad,
            Categoria: productoObj.categoria,
            Precio: productoObj.precio
        }])
        .eq('id', id);
    
    if (error) {
        console.error("Error al actualizar el producto: ", error);
    } else {
        cargarProductos();
    }
}

async function eliminarProductosSP(id){
    const { error }= await supabase
        .from('Ferreteria')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error al eliminar el producto: ", error);
    } else {
        cargarProductos();
    }
}


formulario.addEventListener("submit", function(e){
    e.preventDefault()
    const producto = document.getElementById("producto").value;
    const referencia = parseInt(document.getElementById("referencia").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;
    const precio = parseFloat(document.getElementById("precio").value); 

    const nuevoProducto = {
        producto,
        referencia,
        cantidad,
        categoria,
        precio
    };

    if (editando !== null) {
        const idEditar = productos[editando].id;
        actualizarProductosSP(idEditar, nuevoProducto);
        editando = null;
    }else{
        guardarProductosSP(nuevoProducto);
    }

    formulario.reset();

    // if(producto && referencia && cantidad){
    //     if(editando !==  null){
    //         productos[editando] = {
    //             ...productos[editando],
    //             producto,
    //             referencia: Number(referencia),
    //             cantidad,
    //             categoria,
    //             precio

    //         };
    //         editando = null
    //     } else {
    //         productos.push({id: identificador++, producto, referencia:Number(referencia), cantidad, categoria, precio});
    //     }
    //     this.reset();
    //     mostrarProductos()
    // }
});

// === Mostras productos en la tabla ====
function mostrarProductos(){
    
    tablaBody.innerHTML="";

    productos.forEach((producto, index)=>{

        const fila = document.createElement("tr");

        fila.innerHTML=``

        fila.innerHTML=`
        <td>${producto.id.toString().padStart(2, "0")}</td>
        <td>${producto.producto}</td>
        <td>${producto.referencia}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>
            <div class="accionesBtns">
                <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                <button class="editar" onclick="editarProducto(${index})">Editar</button>
            </div>
        </td>
        `
        tablaBody.appendChild(fila);
    })
}

// === Funcion para eliminar y editar productos ===
function eliminarProducto(index){
    const idEliminar = productos[index].id;
    eliminarProductosSP(idEliminar);
}

// === Aqui se edita ===
function editarProducto(index){
    const producto = productos[index];
    document.getElementById("producto").value = producto.producto;
    document.getElementById("referencia").value = producto.referencia;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    editando = index;
    
    const editarBtn = document.querySelectorAll(".editar");

    editarBtn.forEach((btn, i)=> {
        btn.style.background = i === index ? "black" : "";
        btn.style.color = i === index ? "white" : "";
    });
};

cargarProductos();

window.addEventListener("DOMContentLoaded", cargarProductos);