let carrito = [];

// Precios de los productos
const precios = {
  chicharron: 28000,
  chorizo: 4000,
  mazorca: 5000,
  maduro: 5000,
  pina: 3500,
  patacon: 4000,
  papavapor: 4000,
  yucavapor: 4000,
  papasfritas: 7000,
  yucasfritas: 7000,
  guacamole: 3000,
  guiso: 3000,
  picodegallo: 3000,
  tartara: 2500,
  suero: 2500
};

function updatePlate() {
  const acompanamientos = ['chorizo', 'mazorca', 'maduro', 'pina', 'patacon', 'papavapor', 'yucavapor', 'papasfritas', 'yucasfritas'];
  const salsas = ['guacamole', 'guiso', 'picodegallo', 'tartara', 'suero'];
  
  const acompSelected = acompanamientos.filter(id => document.getElementById(id).checked);
  const salsasSelected = salsas.filter(id => document.getElementById(id).checked);
  
  // Actualizar contador de acompañamientos
  actualizarContador('acomp', acompSelected.length);
  
  // Actualizar contador de salsas
  actualizarContador('salsas', salsasSelected.length);
  
  // Control de acompañamientos
  if (acompSelected.length > 2) {
    const ultimoAcomp = acompSelected[acompSelected.length - 1];
    const precio = precios[ultimoAcomp];
    const nombre = document.querySelector(`label[for="${ultimoAcomp}"] .item-title`).textContent;
    
    mostrarModalAdicional('acompañamiento', nombre, precio, () => {
      // Usuario acepta
    }, () => {
      // Usuario rechaza
      document.getElementById(ultimoAcomp).checked = false;
      actualizarContador('acomp', acompSelected.length - 1);
      actualizarPrecioTotal();
    });
  }
  
  // Control de salsas
  if (salsasSelected.length > 2) {
    const ultimaSalsa = salsasSelected[salsasSelected.length - 1];
    const precio = precios[ultimaSalsa];
    const nombre = document.querySelector(`label[for="${ultimaSalsa}"] .item-title`).textContent;
    
    mostrarModalAdicional('salsa', nombre, precio, () => {
      // Usuario acepta
    }, () => {
      // Usuario rechaza
      document.getElementById(ultimaSalsa).checked = false;
      actualizarContador('salsas', salsasSelected.length - 1);
      actualizarPrecioTotal();
    });
  }
  
  actualizarPrecioTotal();
}

function actualizarContador(tipo, cantidad) {
  const grupos = document.querySelectorAll('.option-group');
  let grupoObjetivo;
  
  if (tipo === 'acomp') {
    grupoObjetivo = grupos[1]; // Segundo grupo (Acompañamientos)
  } else {
    grupoObjetivo = grupos[2]; // Tercer grupo (Salsas)
  }
  
  let contador = grupoObjetivo.querySelector('.contador-seleccion');
  
  if (!contador) {
    contador = document.createElement('div');
    contador.className = 'contador-seleccion';
    const titulo = grupoObjetivo.querySelector('.group-title');
    titulo.appendChild(contador);
  }
  
  const incluidos = Math.min(cantidad, 2);
  const adicionales = Math.max(cantidad - 2, 0);
  
  if (cantidad === 0) {
    contador.innerHTML = '<span style="color: #999;">Ninguno seleccionado</span>';
  } else if (cantidad <= 2) {
    contador.innerHTML = `<span style="color: #4CAF50;">✓ ${cantidad}/2 incluidos</span>`;
  } else {
    contador.innerHTML = `<span style="color: #4CAF50;">✓ 2/2 incluidos</span> <span style="color: #ff9800;">+ ${adicionales} adicional(es)</span>`;
  }
}

function mostrarModalAdicional(tipo, nombre, precio, onAceptar, onCancelar) {
  // Crear overlay
  const overlay = document.createElement('div');
  overlay.id = 'modalAdicionalOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `;
  
  // Crear modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
    text-align: center;
  `;
  
  modal.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
    <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.5rem;">¡Producto Adicional!</h2>
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; margin: 1.5rem 0; border-radius: 8px; text-align: left;">
      <p style="margin: 0; color: #856404; line-height: 1.6;">
        <strong>Ya tiene 2 ${tipo}s incluidos</strong> en su chicharrón. 
        Los primeros 2 son <strong>GRATIS</strong>, pero cada adicional tiene un costo extra.
      </p>
    </div>
    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
      <p style="color: #666; margin-bottom: 0.5rem; font-size: 0.9rem;">Quiere agregar:</p>
      <h3 style="color: #d4a574; margin: 0.5rem 0; font-size: 1.3rem;">${nombre}</h3>
      <p style="color: #333; font-size: 1.8rem; font-weight: bold; margin: 0.5rem 0;">+$${precio.toLocaleString()}</p>
      <p style="color: #999; margin-top: 0.5rem; font-size: 0.85rem;">Este valor se agregará al total de su plato</p>
    </div>
    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
      <button id="btnCancelar" style="
        flex: 1;
        padding: 1rem;
        border: 2px solid #ddd;
        background: white;
        color: #666;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
      ">
        No, gracias
      </button>
      <button id="btnAceptar" style="
        flex: 1;
        padding: 1rem;
        border: none;
        background: linear-gradient(135deg, #d4a574 0%, #c9964a 100%);
        color: white;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(212, 165, 116, 0.4);
      ">
        ¡Sí, agregar!
      </button>
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Agregar estilos de animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    #btnAceptar:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 165, 116, 0.5);
    }
    #btnCancelar:hover {
      border-color: #999;
      background: #f8f9fa;
    }
  `;
  document.head.appendChild(style);
  
  // Event listeners
  document.getElementById('btnAceptar').onclick = () => {
    onAceptar();
    document.body.removeChild(overlay);
    actualizarPrecioTotal();
  };
  
  document.getElementById('btnCancelar').onclick = () => {
    onCancelar();
    document.body.removeChild(overlay);
  };
  
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      onCancelar();
      document.body.removeChild(overlay);
    }
  };
}

function actualizarPrecioTotal() {
  const acompanamientos = ['chorizo', 'mazorca', 'maduro', 'pina', 'patacon', 'papavapor', 'yucavapor', 'papasfritas', 'yucasfritas'];
  const salsas = ['guacamole', 'guiso', 'picodegallo', 'tartara', 'suero'];
  
  const acompSelected = acompanamientos.filter(id => document.getElementById(id).checked);
  const salsasSelected = salsas.filter(id => document.getElementById(id).checked);
  
  let total = precios.chicharron;
  let desglose = [];
  
  // Los primeros 2 acompañamientos son gratis, los demás se cobran
  if (acompSelected.length > 2) {
    for (let i = 2; i < acompSelected.length; i++) {
      total += precios[acompSelected[i]];
    }
  }
  
  // Las primeras 2 salsas son gratis, las demás se cobran
  if (salsasSelected.length > 2) {
    for (let i = 2; i < salsasSelected.length; i++) {
      total += precios[salsasSelected[i]];
    }
  }
  
  // Actualizar el precio en la interfaz
  const plateText = document.querySelector('.plate-subtitle');
  if (plateText) {
    let mensaje = `<strong style="color: #d4a574; font-size: 1.3em;">$${total.toLocaleString()}</strong>`;
    
    if (acompSelected.length > 2 || salsasSelected.length > 2) {
      const adicionales = (acompSelected.length > 2 ? acompSelected.length - 2 : 0) + 
                         (salsasSelected.length > 2 ? salsasSelected.length - 2 : 0);
      mensaje += `<br><small style="color: #ff9800; font-size: 0.85em;">Incluye ${adicionales} adicional(es)</small>`;
    }
    
  
  }
}

function agregarAlCarrito() {
  const acompanamientos = ['chorizo', 'mazorca', 'maduro', 'pina', 'patacon', 'papavapor', 'yucavapor', 'papasfritas', 'yucasfritas'];
  const salsas = ['guacamole', 'guiso', 'picodegallo', 'tartara', 'suero'];
  
  const acompSelected = acompanamientos.filter(id => document.getElementById(id).checked);
  const salsasSelected = salsas.filter(id => document.getElementById(id).checked);
  
  if (acompSelected.length === 0 || salsasSelected.length === 0) {
    alert('¡Ey parcerit@! Debe seleccionar al menos un acompañamiento y una salsa');
    return;
  }
  
  const plato = {
    chicharron: true,
    acompanamientos: acompSelected,
    salsas: salsasSelected,
    precio: calcularPrecioPlato(acompSelected, salsasSelected)
  };

  carrito.push(plato);
  actualizarCarrito();
  
  // Limpiar selecciones
  acompanamientos.forEach(id => document.getElementById(id).checked = false);
  salsas.forEach(id => document.getElementById(id).checked = false);
  
  // Resetear contadores
  actualizarContador('acomp', 0);
  actualizarContador('salsas', 0);
  actualizarPrecioTotal();

  const contadorDiv = document.getElementById("contadorPlatos");
  const numeroPlatos = document.getElementById("numeroPlatos");

  contadorDiv.style.display = "block";
  numeroPlatos.textContent = carrito.length;

  contadorDiv.style.animation = "pulse 0.3s";
  setTimeout(() => {
    contadorDiv.style.animation = "";
  }, 300);
}

function calcularPrecioPlato(acompanamientos, salsas) {
  let total = precios.chicharron;
  
  // Los primeros 2 acompañamientos son gratis
  if (acompanamientos.length > 2) {
    for (let i = 2; i < acompanamientos.length; i++) {
      total += precios[acompanamientos[i]];
    }
  }
  
  // Las primeras 2 salsas son gratis
  if (salsas.length > 2) {
    for (let i = 2; i < salsas.length; i++) {
      total += precios[salsas[i]];
    }
  }
  
  return total;
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  let totalPedido = 0;

  carrito.forEach((plato, index) => {
    totalPedido += plato.precio;
    const div = document.createElement("div");
    div.style.cssText =
      "background: #f8f8f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;";
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>Chicharrón ${index + 1} - $${plato.precio.toLocaleString()}</strong>
        <button onclick="eliminarDelCarrito(${index})" style="background: #ff0000; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer;">X</button>
      </div>
      <small>${obtenerDescripcionPlato(plato)}</small>
    `;
    listaCarrito.appendChild(div);
  });
  
  // Agregar total del pedido
  if (carrito.length > 0) {
    const divTotal = document.createElement("div");
    divTotal.style.cssText = "background: linear-gradient(135deg, #d4a574 0%, #c9964a 100%); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-weight: bold; text-align: center; font-size: 1.1rem;";
    divTotal.innerHTML = `TOTAL DEL PEDIDO: $${totalPedido.toLocaleString()}`;
    listaCarrito.appendChild(divTotal);
  }

  const numeroPlatos = document.getElementById("numeroPlatos");
  if (numeroPlatos) {
    numeroPlatos.textContent = carrito.length;
  }

  const contadorDiv = document.getElementById("contadorPlatos");
  if (contadorDiv) {
    contadorDiv.style.display = carrito.length > 0 ? "block" : "none";
  }
}

function obtenerDescripcionPlato(plato) {
  const nombreAcomp = {
    chorizo: 'Chorizo',
    mazorca: 'Mazorca',
    maduro: 'Maduro',
    pina: 'Piña Asada',
    patacon: 'Patacón',
    papavapor: 'Papa al Vapor',
    yucavapor: 'Yuca al Vapor',
    papasfritas: 'Papas Fritas',
    yucasfritas: 'Yucas Fritas'
  };
  
  const nombreSalsas = {
    guacamole: 'Guacamole',
    guiso: 'Guiso',
    picodegallo: 'Pico de Gallo',
    tartara: 'Tártara',
    suero: 'Suero Costeño'
  };
  
  let desc = [];
  
  // Acompañamientos
  if (plato.acompanamientos && plato.acompanamientos.length > 0) {
    const acompTexto = plato.acompanamientos.map((a, i) => {
      const nombre = nombreAcomp[a];
      if (i >= 2) {
        return `${nombre} (+$${precios[a].toLocaleString()})`;
      }
      return nombre;
    }).join(', ');
    desc.push(acompTexto);
  }
  
  // Salsas
  if (plato.salsas && plato.salsas.length > 0) {
    const salsasTexto = plato.salsas.map((s, i) => {
      const nombre = nombreSalsas[s];
      if (i >= 2) {
        return `${nombre} (+$${precios[s].toLocaleString()})`;
      }
      return nombre;
    }).join(', ');
    desc.push(salsasTexto);
  }
  
  return desc.join('<br>');
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  
  const modalFormulario = document.getElementById("modalFormulario");
  if (modalFormulario.style.display === "flex") {
    actualizarResumenPedido();
  }
}

function eliminarDelResumen(index) {
  if (confirm("¿Seguro que quiere eliminar este chicharrón del pedido?")) {
    carrito.splice(index, 1);
    actualizarCarrito();
    actualizarResumenPedido();
    
    if (carrito.length === 0) {
      alert("¡Ey parcerit@! Se quedó sin platos. Agregue al menos uno pa' continuar");
      cerrarFormulario();
    }
  }
}

function actualizarResumenPedido() {
  const resumen = document.getElementById("resumenPedido");
  let totalPedido = 0;
  
  resumen.innerHTML = carrito
    .map((plato, i) => {
      totalPedido += plato.precio;
      return `<div style="display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0; padding: 0.8rem; background: white; border-radius: 8px; border-left: 4px solid #d4a574;">
          <div style="flex: 1;">
            <p style="margin: 0 0 0.3rem 0;"><strong>Chicharrón ${i + 1}</strong> <span style="color: #d4a574; font-weight: bold;">$${plato.precio.toLocaleString()}</span></p>
            <small style="color: #666; line-height: 1.4;">${obtenerDescripcionPlato(plato)}</small>
          </div>
          <button onclick="eliminarDelResumen(${i})" style="background: #ff0000; color: white; border: none; padding: 0.4rem 0.7rem; border-radius: 5px; cursor: pointer; font-size: 0.9rem; margin-left: 1rem;">X</button>
        </div>`;
    })
    .join("");
    
  resumen.innerHTML += `<div style="background: linear-gradient(135deg, #d4a574 0%, #c9964a 100%); color: white; padding: 1.2rem; border-radius: 12px; margin-top: 1rem; font-weight: bold; text-align: center; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);">
      TOTAL A PAGAR: $${totalPedido.toLocaleString()}
  </div>`;
}

function toggleCarrito() {
  const panel = document.getElementById("panelCarrito");
  const isVisible = panel.style.display === "block";
  panel.style.display = isVisible ? "none" : "block";
  setTimeout(() => {
    panel.style.right = isVisible ? "-400px" : "0";
  }, 10);
}

function mostrarFormularioEntrega() {
  if (carrito.length === 0) {
    alert("¡Ey parcerit@! Agregue al menos un plato al pedido");
    return;
  }

  document.getElementById("panelCarrito").style.display = "none";
  document.getElementById("panelCarrito").style.right = "-400px";

  actualizarResumenPedido();

  document.getElementById("modalFormulario").style.display = "flex";
}

function cerrarFormulario() {
  document.getElementById("modalFormulario").style.display = "none";
}

function guardarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const barrio = document.getElementById("barrio").value.trim();
  const indicaciones = document.getElementById("indicaciones").value.trim();

  if (!nombre || !telefono || !direccion || !barrio) {
    alert(
      "¡Ojo mijo! Llene todos los campos obligatorios pa' poder hacer el pedido"
    );
    return;
  }

  document.getElementById("nombreConfirm").textContent = nombre;
  document.getElementById("telefonoConfirm").textContent = telefono;
  document.getElementById("direccionConfirm").textContent = direccion;
  document.getElementById("barrioConfirm").textContent = barrio;
  document.getElementById("indicacionesConfirm").textContent =
    indicaciones || "Ninguna";

  document.getElementById("modalFormulario").style.display = "none";
  document.getElementById("modalConfirmacion").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalConfirmacion").style.display = "none";
  document.getElementById("modalFormulario").style.display = "flex";
}

function confirmarPedido() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const barrio = document.getElementById("barrio").value;
  const indicaciones = document.getElementById("indicaciones").value;

  let totalPedido = 0;
  let pedido = "🔥 *PEDIDO PURO HUMO* 🔥\n\n";
  pedido += `👤 *Cliente:* ${nombre}\n`;
  pedido += `📱 *Teléfono:* ${telefono}\n`;
  pedido += `📍 *Dirección:* ${direccion}\n`;
  pedido += `🏘️ *Barrio:* ${barrio}\n`;
  if (indicaciones) pedido += `📝 *Indicaciones:* ${indicaciones}\n`;
  pedido += "\n━━━━━━━━━━━━━━━━━━━━\n";
  pedido += "*📋 DETALLE DEL PEDIDO:*\n";
  pedido += "━━━━━━━━━━━━━━━━━━━━\n\n";

  carrito.forEach((plato, index) => {
    totalPedido += plato.precio;
    pedido += `*🍖 Chicharrón ${index + 1}:* $${plato.precio.toLocaleString()}\n`;
    pedido += obtenerDescripcionPlatoTexto(plato) + "\n";
    pedido += "━━━━━━━━━━━━━━━━━━━━\n\n";
  });
  
  pedido += `\n*TOTAL A PAGAR: $${totalPedido.toLocaleString()}*\n\n`;
  pedido += "¡Gracias por su pedido! 🔥";

  const numeroWhatsApp = "573001234567"; 
  const mensajeWhatsApp = encodeURIComponent(pedido);
  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`,
    "_blank"
  );

  cerrarModal();
  document.getElementById("modalConfirmacion").style.display = "none";
  
  carrito = [];
  actualizarCarrito();
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("barrio").value = "";
  document.getElementById("indicaciones").value = "";
}

function obtenerDescripcionPlatoTexto(plato) {
  const nombreAcomp = {
    chorizo: 'Chorizo',
    mazorca: 'Mazorca',
    maduro: 'Maduro',
    pina: 'Piña Asada',
    patacon: 'Patacón',
    papavapor: 'Papa al Vapor',
    yucavapor: 'Yuca al Vapor',
    papasfritas: 'Papas Fritas',
    yucasfritas: 'Yucas Fritas'
  };
  
  const nombreSalsas = {
    guacamole: 'Guacamole',
    guiso: 'Guiso',
    picodegallo: 'Pico de Gallo',
    tartara: 'Tártara',
    suero: 'Suero Costeño'
  };
  
  let texto = '';
  
  // Acompañamientos
  if (plato.acompanamientos && plato.acompanamientos.length > 0) {
    texto += '🍽️ *Acompañamientos:*\n';
    plato.acompanamientos.forEach((a, i) => {
      const nombre = nombreAcomp[a];
      if (i < 2) {
        texto += `   • ${nombre} (incluido)\n`;
      } else {
        texto += `   • ${nombre} (adicional +$${precios[a].toLocaleString()})\n`;
      }
    });
  }
  
  // Salsas
  if (plato.salsas && plato.salsas.length > 0) {
    texto += '\n🌶️ *Salsas:*\n';
    plato.salsas.forEach((s, i) => {
      const nombre = nombreSalsas[s];
      if (i < 2) {
        texto += `   • ${nombre} (incluida)\n`;
      } else {
        texto += `   • ${nombre} (adicional +$${precios[s].toLocaleString()})\n`;
      }
    });
  }
  
  return texto;
}

// Inicializar contadores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador('acomp', 0);
  actualizarContador('salsas', 0);
  actualizarPrecioTotal();
});