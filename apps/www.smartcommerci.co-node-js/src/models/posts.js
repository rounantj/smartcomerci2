<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
const db = require('./db')
const posts = db.sequelize.define('posts',{ 
    
    post_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    post_titulo:{
        type:db.Sequelize.STRING
    },
    post_chamada:{
        type:db.Sequelize.STRING
    },
    post_categoria:{
        type:db.Sequelize.STRING
    },
    post_etiquetas:{
        type:db.Sequelize.STRING
    },
    post_conteudo:{
        type:db.Sequelize.STRING
    }
})

<<<<<<< HEAD
=======
const db = require('./db')
const posts = db.sequelize.define('posts',{ 
    
    post_affiliate_id:{
        type:db.Sequelize.INTEGER
    },
    post_titulo:{
        type:db.Sequelize.STRING
    },
    post_chamada:{
        type:db.Sequelize.STRING
    },
    post_categoria:{
        type:db.Sequelize.STRING
    },
    post_etiquetas:{
        type:db.Sequelize.STRING
    },
    post_conteudo:{
        type:db.Sequelize.STRING
    }
})

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
module.exports = posts