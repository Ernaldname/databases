document.getElementById('clienteForm').addEventListener('submit', async (e) => {
 e.preventDefault();

 const telefono = document.getElementById('telefono').value;
 const email = document.getElementById('email').value;
 const nombre = document.getElementById('nombre').value;

 try {
     const response = await fetch('/clientes', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ telefono, email, nombre }),
     });

     if (response.ok) {
         alert('Cliente creado exitosamente');
     } else {
         alert('Error al crear el cliente');
     }
 } catch (error) {
     console.error('Error:', error);
     alert('Error al crear el cliente');
 }
});
