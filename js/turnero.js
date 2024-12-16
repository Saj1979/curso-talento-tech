// Configuración de productos con stock
const turnos = {
    electrocardiograma: { 
        nombre: 'Electrocardiograma', 
        precio: 5000, 
        stock: 10,
    },
    laboratorio: { 
        nombre: 'Laboratorio', 
        precio: 6000, 
        stock: 10,
    },
    consulta: { 
        nombre: 'Consulta', 
        precio: 3000, 
        stock: 10,
    }
};

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

function agregarAlCarrito(nombre, precio, turnoKey) {
    // Obtener el producto específico
    const turno = turnos[turnoKey];

    // Validar stock
    if (turno.stock <= 0) {
        alert('No hay turnos disponibles');
        return;
    }

    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Agregar nuevo producto
    carrito.push({ 
        nombre: turno.nombre, 
        precio: turno.precio,
        turnoKey: turnoKey
    });
    
    // Reducir stock
    turno.stock--;
    document.getElementById(`stock-${turnoKey}`).textContent = turno.stock;
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar vista del carrito
    renderizarCarrito();
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar lista anterior
    listaCarrito.innerHTML = '';
    
    // Totales iniciales
    let subtotal = 0;
    
    // Renderizar cada producto
    carrito.forEach((turno, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${turno.nombre} - $${turno.precio}`;
        
        // Botón para eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
        
        // Sumar al subtotal
        subtotal += turno.precio;
    });
    
    // Actualizar totales
    subtotalCarrito.textContent = subtotal.toFixed(2);
    totalCarrito.textContent = subtotal.toFixed(2); // Total igual al subtotal
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Recuperar el producto para devolver stock
    const turno = turnos[carrito[index].turnoKey];
    turno.stock++;
    document.getElementById(`stock-${carrito[index].turnoKey}`).textContent = turno.stock;
    
    // Eliminar producto por índice
    carrito.splice(index, 1);
    
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Renderizar de nuevo
    renderizarCarrito();
}

function vaciarCarrito() {
    // Restaurar stock de todos los productos
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const turno = turnos[item.turnoKey];
        turno.stock++;
        document.getElementById(`stock-${item.turnoKey}`).textContent = turno.stock;
    });
    
    // Limpiar localStorage
    localStorage.removeItem('carrito');
    
    // Renderizar
    renderizarCarrito();
}

function cargarCarrito() {
    // Cargar carrito al iniciar la página
    renderizarCarrito();
}

// Funciones de Checkout
function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Validar que hay productos en el carrito
    if (carrito.length === 0) {
        alert('No hay turnos seleccionados');
        return;
    }
    
    // Mostrar modal de checkout
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';
    
    // Actualizar totales en el modal
    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    
    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-total').textContent = subtotal.toFixed(2); // Total igual al subtotal
}

function realizarCompra() {
    // Simular compra
    alert('Gracias por confiar en nosotros. Para cancelaciones comunicarse 24 hs antes al 0800-111-2365');
    
    // Vaciar carrito
    localStorage.removeItem('carrito');
    
    // Cerrar modal
    cerrarCheckout();
    
    // Renderizar carrito
    renderizarCarrito();
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';}