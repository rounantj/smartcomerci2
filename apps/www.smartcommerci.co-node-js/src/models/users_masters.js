<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
const db = require('./db')
const users_master = db.sequelize.define('users_masters',{
   
    
  
    users_master_name:{
        type:db.Sequelize.STRING
    },
    users_master_mail:{
        type:db.Sequelize.STRING
    },
    users_master_token:{
        type:db.Sequelize.STRING
    }
})






<<<<<<< HEAD
=======
const db = require('./db')
const users_master = db.sequelize.define('users_masters',{
   
    
  
    users_master_name:{
        type:db.Sequelize.STRING
    },
    users_master_mail:{
        type:db.Sequelize.STRING
    },
    users_master_token:{
        type:db.Sequelize.STRING
    }
})






>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
module.exports = users_master