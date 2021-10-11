<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
const db = require('./db')
const products = db.sequelize.define('products',{ 
  
    product_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    product_descricao:{
        type:db.Sequelize.STRING
    },
    product_valor:{
        type:db.Sequelize.FLOAT
    },
    product_categoria:{
        type:db.Sequelize.STRING
    },
    product_fabricacao:{
        type:db.Sequelize.STRING
    },
    product_estoque:{
        type:db.Sequelize.INTEGER
    },
    product_medida:{
        type:db.Sequelize.STRING
    },
    product_etiquetas:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const db = require('./db')
const products = db.sequelize.define('products',{ 
  
    product_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    product_descricao:{
        type:db.Sequelize.STRING
    },
    product_valor:{
        type:db.Sequelize.FLOAT
    },
    product_categoria:{
        type:db.Sequelize.STRING
    },
    product_fabricacao:{
        type:db.Sequelize.STRING
    },
    product_estoque:{
        type:db.Sequelize.INTEGER
    },
    product_medida:{
        type:db.Sequelize.STRING
    },
    product_etiquetas:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
module.exports = products