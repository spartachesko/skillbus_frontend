document.addEventListener("DOMContentLoaded", () => {
  async function getClients() {
    const response = await fetch("http://localhost:3000/api/clients", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    )
    let clientsArray = await response.json();
    return clientsArray;
  }

  console.log(getClients());

  

})