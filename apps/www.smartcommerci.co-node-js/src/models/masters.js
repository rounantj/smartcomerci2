<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
const db = require('./db')
const masters = db.sequelize.define('masters',{       
  
    master_business_name:{
        type:db.Sequelize.STRING
    },
    master_business_cnpj:{
        type:db.Sequelize.STRING
    },
    master_business_razao:{
        type:db.Sequelize.STRING
    },
    master_business_telefone:{
        type:db.Sequelize.STRING
    },
    master_business_mail:{
        type:db.Sequelize.STRING
    },
    master_business_horario:{
        type:db.Sequelize.STRING
    },
    master_business_endereco:{
        type:db.Sequelize.STRING
    },
    master_business_numero:{
        type:db.Sequelize.STRING
    },
    master_business_cep:{
        type:db.Sequelize.STRING
    },
    master_business_cidade:{
        type:db.Sequelize.STRING
    },
    master_business_estado:{
        type:db.Sequelize.STRING
    },
    master_custom_segmento:{
        type:db.Sequelize.STRING
    },
    master_custom_logo:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_primeira:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_segunda:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_terceira:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_quarta:{
        type:db.Sequelize.STRING
    },
    master_custom_categorias:{
        type:db.Sequelize.STRING
    },
    master_custom_ferramentas:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const db = require('./db')
const masters = db.sequelize.define('masters',{       
  
    master_business_name:{
        type:db.Sequelize.STRING
    },
    master_business_cnpj:{
        type:db.Sequelize.STRING
    },
    master_business_razao:{
        type:db.Sequelize.STRING
    },
    master_business_telefone:{
        type:db.Sequelize.STRING
    },
    master_business_mail:{
        type:db.Sequelize.STRING
    },
    master_business_horario:{
        type:db.Sequelize.STRING
    },
    master_business_endereco:{
        type:db.Sequelize.STRING
    },
    master_business_numero:{
        type:db.Sequelize.STRING
    },
    master_business_cep:{
        type:db.Sequelize.STRING
    },
    master_business_cidade:{
        type:db.Sequelize.STRING
    },
    master_business_estado:{
        type:db.Sequelize.STRING
    },
    master_custom_segmento:{
        type:db.Sequelize.STRING
    },
    master_custom_logo:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_primeira:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_segunda:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_terceira:{
        type:db.Sequelize.STRING
    },
    master_custom_cor_quarta:{
        type:db.Sequelize.STRING
    },
    master_custom_categorias:{
        type:db.Sequelize.STRING
    },
    master_custom_ferramentas:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
module.exports = masters