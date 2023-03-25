document.addEventListener("DOMContentLoaded", async () => {
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
  // console.log(getClients());

  async function addClient() {
    console.log('START');
    const response = await fetch("http://localhost:3000/api/clients", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Peter',
        surname: 'Gonin',
        lastName: 'Petrovich',
        contacts: [
          {
            type: 'mobile',
            value: '789456123'
          },
          {
            type: 'home',
            value: '456123'
          }
        ]
      })
    }
    )

    let result = await response.json();
    console.log(result);
  }

  function formatDate(date) {
    var dd = new Date(date).getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = new Date(date).getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = new Date(date).getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }

  async function removeClient(idClient) {
    await fetch(`http://localhost:3000/api/clients/${idClient}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  function getClientItem(clientObj) {

    console.log('clientObj', clientObj);
    let idClient = document.createElement('td');
    let FIO = document.createElement('td');
    let dateCreated = document.createElement('td');
    let dateUpdates = document.createElement('td');
    let contactsClient = document.createElement('td');
    let optionsClient = document.createElement('td');
    let btnRemove = document.createElement('button');
    let btnUpdate = document.createElement('button');

    btnRemove.textContent = 'Удалить';
    btnUpdate.textContent = 'Изменить';
    btnRemove.setAttribute('id', clientObj.id);
    btnRemove.addEventListener('click', () => {
      removeClient(clientObj.id);
      
    })

    optionsClient.append(btnUpdate);
    optionsClient.append(btnRemove);

    let clientInfo = document.createElement('tr')

    FIO.textContent = clientObj.lastName + ' ' + clientObj.name + ' ' + clientObj.surname;

    const createdSeconds = new Date(clientObj.createdAt).getTime();
    const updatedSeconds = new Date(clientObj.updatedAt).getTime();

    dateCreated.textContent = formatDate(createdSeconds);
    dateUpdates.textContent = formatDate(updatedSeconds);
    contactsClient.textContent = clientObj.contacts ;

    idClient.textContent = clientObj.id;

    clientInfo.append(idClient);
    clientInfo.append(FIO);
    clientInfo.append(dateCreated);
    clientInfo.append(dateUpdates);
    clientInfo.append(contactsClient);
    clientInfo.append(optionsClient);

    return clientInfo;
  }

  function renderTable(clientsArray) {
    console.log('clientsArray', clientsArray)

    let tbody = document.querySelector(".clientsList");

    clientsArray.forEach(client => {
      tbody.append(getClientItem(client));
    });


  };


  renderTable(await getClients());



  let btnAddClient = document.querySelector(".add__client");

  btnAddClient.addEventListener('click', async function (e) {

    e.preventDefault();
    // await addClient()

  })



})