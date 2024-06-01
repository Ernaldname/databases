document.getElementById('clienteForm').addEventListener('submit', async function(event) {
 event.preventDefault();
 
 const formData = new FormData(this);
 
 try {
   const response = await fetch('/cliente', {
     method: 'POST',
     body: formData
   });
   
   if (response.ok) {
     const data = await response.json();
     console.log('Cliente agregado:', data);
   } else {
     console.error('Error al agregar cliente:', response.statusText);
   }
 } catch (error) {
   console.error('Error al conectarse con el servidor:', error);
 }
});