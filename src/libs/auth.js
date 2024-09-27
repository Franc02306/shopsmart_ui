const backendUrl = import.meta.env.VITE_BACKEND_URL;

fetch(`${backendUrl}/products`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
