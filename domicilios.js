let carrito = [];

function agregarAlCarrito() {
  const plato = {
    chicharron: document.getElementById("chicharron").checked,
    aji: document.getElementById("aji").checked,
    tartara: document.getElementById("tartara").checked,
    suero: document.getElementById("suero").checked,
    aguacate: document.getElementById("aguacate").checked,
    maduro: document.getElementById("maduro").checked,
    arepa: document.querySelector('input[name="arepa"]:checked')?.id,
    tuberculo: document.querySelector('input[name="tuberculo"]:checked')?.id,
  };

  carrito.push(plato);
  actualizarCarrito();


  const contadorDiv = document.getElementById("contadorPlatos");
  const numeroPlatos = document.getElementById("numeroPlatos");

  contadorDiv.style.display = "block";
  numeroPlatos.textContent = carrito.length;

  contadorDiv.style.animation = "pulse 0.3s";
  setTimeout(() => {
    contadorDiv.style.animation = "";
  }, 300);

}

function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((plato, index) => {
    const div = document.createElement("div");
    div.style.cssText =
      "background: #f8f8f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;";
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>Chicharrón ${index + 1}</strong>
        <button onclick="eliminarDelCarrito(${index})" style="background: #ff0000; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer;">X</button>
      </div>
      <small>${obtenerDescripcionPlato(plato)}</small>
    `;
    listaCarrito.appendChild(div);
  });

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
  let desc = [];
  if (plato.aji) desc.push("Ají");
  if (plato.tartara) desc.push("Tártara");
  if (plato.suero) desc.push("Suero");
  if (plato.aguacate) desc.push("Aguacate");
  if (plato.maduro) desc.push("Maduro");

  if (plato.arepa === "arepa-amarilla") desc.push("Arepa Amarilla");
  else if (plato.arepa === "arepa-blanca") desc.push("Arepa Blanca");

  if (plato.tuberculo === "yuca") desc.push("Yuca");
  else if (plato.tuberculo === "papa") desc.push("Papa");

  return desc.join(", ");
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
      alert("¡Ey parce! Se quedó sin platos. Agregue al menos uno pa' continuar");
      cerrarFormulario();
    }
  }
}

function actualizarResumenPedido() {
  const resumen = document.getElementById("resumenPedido");
  resumen.innerHTML = carrito
    .map(
      (plato, i) =>
        `<div style="display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 5px;">
          <p style="margin: 0;"><strong>Chicharrón ${i + 1}:</strong> ${obtenerDescripcionPlato(plato)}</p>
          <button onclick="eliminarDelResumen(${i})" style="background: #ff0000; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">X</button>
        </div>`
    )
    .join("");
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
    alert("¡Ey parce! Agregue al menos un plato al pedido");
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

  let pedido = "🔥 *PEDIDO PURO HUMO* 🔥\n\n";
  pedido += `👤 *Cliente:* ${nombre}\n`;
  pedido += `📱 *Teléfono:* ${telefono}\n`;
  pedido += `📍 *Dirección:* ${direccion}\n`;
  pedido += `🏘️ *Barrio:* ${barrio}\n`;
  if (indicaciones) pedido += `📝 *Indicaciones:* ${indicaciones}\n`;
  pedido += "\n*PEDIDO:*\n\n";

  carrito.forEach((plato, index) => {
    pedido += `*Chicharrón ${index + 1}:*\n`;
    pedido += obtenerDescripcionPlato(plato) + "\n\n";
  });

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