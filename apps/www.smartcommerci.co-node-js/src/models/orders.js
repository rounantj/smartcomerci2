<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
const db = require('./db')
const orders = db.sequelize.define('orders',{ 
  
    order_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    order_client_id:{
        type:db.Sequelize.INTEGER
    },
    order_status:{
        type:db.Sequelize.STRING
    },
    order_data_entrega:{
        type:db.Sequelize.DATE
    },
    order_metodo_pagamento:{
        type:db.Sequelize.STRING
    },
    order_cpf_nf:{
        type:db.Sequelize.STRING
    },
    order_tamanho_cesta:{
        type:db.Sequelize.STRING
    },
    order_conteudo:{
        type:db.Sequelize.STRING
    },
    order_valor_total:{
        type:db.Sequelize.FLOAT
    }
})

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const db = require('./db')
const orders = db.sequelize.define('orders',{ 
  
    order_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    order_client_id:{
        type:db.Sequelize.INTEGER
    },
    order_status:{
        type:db.Sequelize.STRING
    },
    order_data_entrega:{
        type:db.Sequelize.DATE
    },
    order_metodo_pagamento:{
        type:db.Sequelize.STRING
    },
    order_cpf_nf:{
        type:db.Sequelize.STRING
    },
    order_tamanho_cesta:{
        type:db.Sequelize.STRING
    },
    order_conteudo:{
        type:db.Sequelize.STRING
    },
    order_valor_total:{
        type:db.Sequelize.FLOAT
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
module.exports = orders