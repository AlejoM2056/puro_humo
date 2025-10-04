function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

const fechaInput = document.getElementById('fecha');
const today = new Date();
fechaInput.min = today.toISOString().split('T')[0];

fechaInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        alert('¡Ojo, mij@! Solo abrimos sábados y domingos. Seleccione un fin de semana.');
        this.value = '';
    }
});

document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const comentarios = document.getElementById('comentarios').value;

    const fechaHoraReserva = new Date(fecha + 'T' + hora + ':00');
    const ahora = new Date();
    const tresHorasDespues = new Date(ahora.getTime() + (3 * 60 * 60 * 1000));
    
    if (fechaHoraReserva < tresHorasDespues) {
        alert('¡Ojo pues! La reserva debe ser con mínimo 3 horas de anticipación.');
        return;
    }
    
    console.log('Reserva:', { nombre, telefono, email, personas, fecha, hora, comentarios });
    
    document.getElementById('confirmationModal').style.display = 'flex';

    this.reset();
});

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

document.getElementById('confirmationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});