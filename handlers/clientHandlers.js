const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

const handleClients = (req, res) => {
  res.status(200).json(clients);
};

const handleAddClient = (req, res) => {
  const newClient = { ...req.body, id: uuidv4() };
  if (clients.filter((client) => client.email === newClient.email).length) {
    res.status(400).json({
      status: 400,
      message: "The clients email already exists in our database",
    });
  } else {
    clients.push(newClient);
    res.status(201).json({
      status: 201,
      data: newClient,
      message: "user created!!",
    });
  }
};

const handleClient = (req, res) => {
  const id = req.params.id;
  const result = clients.find((client) => {
    if (client.id === id) {
      return client;
    }
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send("Client ID not found");
  }
};

const handleDeleteClient = (req, res) => {
  const id = req.params.id;
  const deletedClientIndex = clients.findIndex((client) => {
    return client.id === id;
  });
  clients.splice(deletedClientIndex, 1);
  res.status(200).send("The Client has been deleted");
};

module.exports = {
  handleClients,
  handleAddClient,
  handleClient,
  handleDeleteClient,
};
