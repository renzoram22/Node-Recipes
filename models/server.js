const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;


    this.paths = {
      auth: '/api/auth',
      recipe: '/api/recipes'
    }
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection()
  }

  
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth,require('../routes/auth'));
    this.app.use(this.paths.recipe,require('../routes/recipes'));


  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor en puerto", this.port);
    });
  }
}

module.exports = Server;
