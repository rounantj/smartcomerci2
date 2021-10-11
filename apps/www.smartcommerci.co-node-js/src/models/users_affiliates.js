<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
const db = require('./db')
const users_affiliates = db.sequelize.define('users_affiliates',{
  
    users_affiliate_master_id:{
        type:db.Sequelize.INTEGER
    },
    users_affiliate_name:{
        type:db.Sequelize.STRING
    },
    users_affiliate_perfil:{
        type:db.Sequelize.STRING
    },
    users_affiliate_mail:{
        type:db.Sequelize.STRING
    },
    users_affiliate_token:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
const db = require('./db')
const users_affiliates = db.sequelize.define('users_affiliates',{
  
    users_affiliate_master_id:{
        type:db.Sequelize.INTEGER
    },
    users_affiliate_name:{
        type:db.Sequelize.STRING
    },
    users_affiliate_perfil:{
        type:db.Sequelize.STRING
    },
    users_affiliate_mail:{
        type:db.Sequelize.STRING
    },
    users_affiliate_token:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
module.exports = users_affiliates