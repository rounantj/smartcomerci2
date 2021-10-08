/*======================= SMARTCOMMERCI ROUTES =========================================================== 

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Definir as rotas da API

=========================================================================================================*/

// Obetendo as dependências
var business = require("../controllers/business")
var users = require("../controllers/users")
var documentation = require("../controllers/documentation")

//==========================================================================================================
// Rota para login
module.exports.login = function (app, verifyJWT) {
    app.post("/login", function (req, res) {
       business.login(req.body,res);
    });
};

//==========================================================================================================
// Rota para busca baseada no ID

module.exports.getById = function (app, verifyJWT) {
    app.post("/getById", verifyJWT, function (req, res) {
        business.getById(req.body, res)
    });
};

//==========================================================================================================
// Rota para busca baseada em um parâmetro 'LIKE'

module.exports.getByLikeParams = function (app, verifyJWT) {
    app.post("/getByLikeParams", verifyJWT, function (req, res) {
       business.getByLikeParams(req.body, res)
    });
};

//==========================================================================================================
// Rota para busca baseada em usuário chave

module.exports.getByClientId = function (app, verifyJWT) {
    app.post("/getByClientId", verifyJWT, function (req, res) {
       business.getByClientId(req.body, res)
    });
};

//==========================================================================================================
// Rota para update de dados pelo ID

module.exports.updateById = function (app, verifyJWT) {
    app.post("/updateById", verifyJWT, function (req, res) {
        business.updateById(req.body, res)
    });
};

//==========================================================================================================
// Rota para inserir dados em tabelas

module.exports.insertNew = function (app, verifyJWT) {
    app.post("/insertNew", verifyJWT, function (req, res) {
        business.insertNew(req.body, res)
    });
};

//==========================================================================================================
// Rota para inserir um novo usuário ( tratado de forma separa das outras tabelas )

module.exports.newLoginInsert = function (app, verifyJWT) {
    app.post("/newLoginInsert", verifyJWT, function (req, res) {
        users.insertNew(req.body, res)
    });
};

//==========================================================================================================
// Rota para recuperar password

module.exports.recoverPassword = function (app, verifyJWT) {
    app.post("/recoverPassword", verifyJWT, function (req, res) {
        users.recoverPassword(req.body, res)
    });
};

//==========================================================================================================
// Rota para identificar usuário

module.exports.me = function (app, verifyJWT) {
    app.post("/me", verifyJWT, function (req, res) {
        business.me(req.body, res)
    });
};

//==========================================================================================================
// Rota para a documentação

module.exports.documentation = async function (app) {
    app.get("/documentation", async function (req, res) {
        documentation.getDocumentation(res);
    });
};

//==========================================================================================================
// Rota para primeiro acesso como matriz

module.exports.startup = async function (app, verifyJWT) {
    app.post("/startup", verifyJWT, async function (req, res) {
        business.startup(req.body, res);
    });
};

//==========================================================================================================
// Rota para envio de e-mail marketing

module.exports.sendNews = async function (app, verifyJWT) {
    app.post("/sendNews", verifyJWT, async function (req, res) {
        business.sendNews(req.body, res);
    });
};

//==========================================================================================================
// Rota para verificar código de 5 dígitos

module.exports.getValidCode = async function (app, verifyJWT) {
    app.post("/getValidCode", verifyJWT, async function (req, res) {
        business.getValidCode(req.body, res);
    });
};

//==========================================================================================================
// Rota para realizar upload da logotipo

module.exports.uploadLogo = async function (app, verifyJWT) {
  
    app.post('/uploadLogo', verifyJWT, (req, res) => {
        try{
          
            const formidable = require('formidable');
            const fs = require('fs');
            const form = new formidable.IncomingForm();
            const dir = "./apps/www.smartcommerci.co-node-js/src/data/images/"+req.headers.user_id;

                //Verifica se não existe
                if (!fs.existsSync(dir)){
                    //Efetua a criação do diretório
                    fs.mkdirSync(dir);
                }

            
            
            form.parse(req, (err, fields, files) => {
         
                
                const path = require('path');
                const oldpath = files.fileimage.path;
                const newpath = path.join("", './apps/www.smartcommerci.co-node-js/src/data/images/'+req.headers.user_id+'/', files.fileimage.name);
               
                
                fs.renameSync(oldpath, newpath);
                res.send({"resultOk": true, "message":"File uploaded"})
            });

        }catch(error){
            res.status(500).json({ message: "Invalid data parameters!", errorMessage: error });
        }
       
    });
    


};

//==========================================================================================================
// Rota para coletar as cores da logotipo enviada

module.exports.myColors = async function (app, verifyJWT) {
    app.post("/myColors", async function(req, res) {
        console.log(req.body)
        const path = require('path')
        const getColors = require('get-image-colors')         
        getColors(path.join("./apps/www.smartcommerci.co-node-js/src/data/images/"+req.headers.user_id+"/", req.body.file)).then(colors => {
            res.send(colors)
        })
    });
    

};
