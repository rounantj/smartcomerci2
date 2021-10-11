<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
const db = require('./db')
const affiliates = db.sequelize.define('affiliates',{       
    
    affiliates_master_id:{
        type:db.Sequelize.INTEGER
    },
    affiliates_business_name:{
        type:db.Sequelize.STRING
    },
    affiliates_business_telefone:{
        type:db.Sequelize.STRING
    },
    affiliates_business_mail:{
        type:db.Sequelize.STRING
    },
    affiliates_business_horario:{
        type:db.Sequelize.STRING
    },
    affiliates_business_endereco:{
        type:db.Sequelize.STRING
    },
    affiliates_business_numero:{
        type:db.Sequelize.STRING
    },
    affiliates_business_cep:{
        type:db.Sequelize.STRING
    },
    affiliates_business_cidade:{
        type:db.Sequelize.STRING
    },
    affiliates_business_estado:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const db = require('./db')
const affiliates = db.sequelize.define('affiliates',{       
    
    affiliates_master_id:{
        type:db.Sequelize.INTEGER
    },
    affiliates_business_name:{
        type:db.Sequelize.STRING
    },
    affiliates_business_telefone:{
        type:db.Sequelize.STRING
    },
    affiliates_business_mail:{
        type:db.Sequelize.STRING
    },
    affiliates_business_horario:{
        type:db.Sequelize.STRING
    },
    affiliates_business_endereco:{
        type:db.Sequelize.STRING
    },
    affiliates_business_numero:{
        type:db.Sequelize.STRING
    },
    affiliates_business_cep:{
        type:db.Sequelize.STRING
    },
    affiliates_business_cidade:{
        type:db.Sequelize.STRING
    },
    affiliates_business_estado:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
module.exports = affiliates