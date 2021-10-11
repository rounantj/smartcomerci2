<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
const db = require('./db')
const carts = db.sequelize.define('carts',{    

    cart_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    cart_client_id:{
        type:db.Sequelize.INTEGER
    },
    cart_status:{
        type:db.Sequelize.STRING
    },
    cart_conteudo:{
        type:db.Sequelize.STRING
    },
    cart_valor_total:{
        type:db.Sequelize.FLOAT
    }
})

<<<<<<< HEAD
=======
const db = require('./db')
const carts = db.sequelize.define('carts',{    

    cart_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    cart_client_id:{
        type:db.Sequelize.INTEGER
    },
    cart_status:{
        type:db.Sequelize.STRING
    },
    cart_conteudo:{
        type:db.Sequelize.STRING
    },
    cart_valor_total:{
        type:db.Sequelize.FLOAT
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
module.exports = carts