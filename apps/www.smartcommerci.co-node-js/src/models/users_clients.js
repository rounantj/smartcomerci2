<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
const db = require('./db')
const users_clients = db.sequelize.define('users_clients',{
    
    users_client_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    users_client_name:{
        type:db.Sequelize.STRING
    },
    users_client_mail:{
        type:db.Sequelize.STRING
    },
    users_client_token:{
        type:db.Sequelize.STRING
    },
    users_client_cpf:{
        type:db.Sequelize.STRING
    },
    users_client_endereco:{
        type:db.Sequelize.STRING
    },
    users_client_cep:{
        type:db.Sequelize.STRING
    },
    users_client_bairro:{
        type:db.Sequelize.STRING
    },
    users_client_cidade:{
        type:db.Sequelize.STRING
    },
    users_client_listas_compras:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const db = require('./db')
const users_clients = db.sequelize.define('users_clients',{
    
    users_client_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    users_client_name:{
        type:db.Sequelize.STRING
    },
    users_client_mail:{
        type:db.Sequelize.STRING
    },
    users_client_token:{
        type:db.Sequelize.STRING
    },
    users_client_cpf:{
        type:db.Sequelize.STRING
    },
    users_client_endereco:{
        type:db.Sequelize.STRING
    },
    users_client_cep:{
        type:db.Sequelize.STRING
    },
    users_client_bairro:{
        type:db.Sequelize.STRING
    },
    users_client_cidade:{
        type:db.Sequelize.STRING
    },
    users_client_listas_compras:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
module.exports = users_clients