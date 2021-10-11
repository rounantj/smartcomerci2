<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
>>>>>>> 9ef3a9d (deploy)
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
>>>>>>> 9ef3a9d (deploy)
module.exports = posts