/*========= SMARTCOMMERCI BUSINESS ========== 

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Consultar e alterar os dados conforme as regras do negócio

============================================*/




// Importando os modelos
var masters = require('../models/masters');
var affiliates = require('../models/affiliates');
var carts = require('../models/carts');
var orders = require('../models/orders');
var posts = require('../models/posts');
var listas_compras = require('../models/listas_compras');
var products = require('../models/products');
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const nodemailer = require('nodemailer');
var moment = require('moment');

// Importando as variaveis de ambiente
require("dotenv").config();

//==========================================================================================================

// Configurando uma conexão com o database
const conn = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

//==========================================================================================================

// Função para executar um comando SQL
async function execSQL(query, res) {
    console.log(query);
    conn.query(query, async function (error, results, fields) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
}

//==========================================================================================================

// Função para envio de e-mails
/*
    Pré requisitos:
        1- 'message' => array com os conteúdos 'to, from, subject, html'
        2- 'parameters' => array com os dados de conexão 'host, port, secure, auth, tls, username'
    
    Retornos:
        1- 'email enviado com sucesso" => ocorreu tudo bem.
        2- 'messageError' => feedback com a mensagem de erro ocasionado.
*/
async function sendMail(parameters, message) {
    const transporter = nodemailer.createTransport({
        host: parameters.host,
        port: parameters.port,
        secure: parameters.secure, // true for 465, false for other ports
        auth: parameters.auth,
        username: parameters.username,
        tls: { rejectUnauthorized: parameters.tls }
      });
    
   const mailOptions = {
        from: message.from,
        to: message.to,
        subject: message.subject,    
        html:message.html
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log("Erro ao enviar!\n"+error)
         return error
        } else {
            console.log("email enviado com sucesso!")
          return info.response
        }
    });

    

}

//==========================================================================================================

// Acionamento dos modelos 'findAll' do sequelize
module.exports.masters = function(err, res){
    masters.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

module.exports.affiliates = function(err, res){
    affiliates.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

module.exports.carts = function(err, res){
    carts.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

module.exports.posts = function(err, res){
    posts.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
}

module.exports.products = function(err, res){
    products.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

module.exports.orders = function(err, res){
    orders.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

module.exports.listas_compras = function(err, res){
    listas_compras.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
}
//***** */ Fim dos modelos findAll ****

//==========================================================================================================

// Devolve a identificação do usuário logado, exigindo por parâmetro o 'token_me': e-mail do usuário criptografado com sha1
/*
    As informações retornadas são:
        1- Tipo de usuário.
        2- ID de usuário.
        3- ID de afiliado e de matriz ( se houver )
        4- Nome de usuário.
        5- E-mail do usuário.
*/
module.exports.me = function(body, res){

    var query1 ="select 'CLIENT' as USER_PROFILE, users_clients.id as USER_ID, users_client_affiliate_id as USER_AFFILIATE_ID, users_client_name as USER_NAME, users_client_mail as USER_MAIL  from users_clients inner join users_affiliates where sha1(concat(users_clients.id,users_client_mail)) = '"+body.token_me+"'";
    var query2 = "select 'AFFILIATE' as USER_PROFILE, users_affiliates.id as USER_ID,users_affiliate_master_id as USER_MASTER_ID, users_affiliate_name as USER_NAME, users_affiliate_mail as USER_MAIL  from users_affiliates  inner join users_masters where sha1(concat(users_affiliates.id,users_affiliate_mail)) = '"+body.token_me+"'";
    var query3 = "select 'MASTER' as USER_PROFILE, id as USER_ID, users_master_name as USER_NAME, users_master_mail as USER_MAIL  from users_masters where sha1(concat(id,users_master_mail)) = '"+body.token_me+"'";

   conn.query(query1, async function (error, results, fields) {
        if (!error) {
            if(results.length > 0){
                res.send(results);
            }else{
                conn.query(query2, async function (error2, results2, fields2) {
                    if (!error2) {
                        if(results2.length > 0){
                            res.send(results2);
                        }else{
                            conn.query(query3, async function (error3, results3, fields3) {
                                if (!error3) {
                                    if(results3.length > 0){
                                        res.send(results3);
                                    }else{
                                        res.status(404).json({ message: "User not found!"});
                                    }
                                    
                                } else {
                                    res.send(error3);
                                }
                            });
                            
                        }
                        
                    } else {
                        
                        res.send(error2);
                    }
                });

            }
            
        } else {
            res.send(error);
        }
    });


   
} 

//==========================================================================================================

// Realiza o login se valendo da 'SECRET_KEY' do JWT com tempo de expiração definido em 'TIME_TO_EXPIRE_SESSION' das váriáveis de ambiente.
/*
    Os pré-requisitos para funcionamento:
        1- 'prefix' => prefixo da tabela baseado no tipo de usuário. Ex.: 'affiliate','master' ou 'client'
        2- 'token' => password enviado pelo cliente para ser criptografado e salvo com sha1.
        3- 'user' => nome do usuário.
        4- 'table' => nome da tabela a ser modificada ( definida com base no tipo do usuário ).
*/
module.exports.login = function(body, res){
    conn.query("select *, sha1(concat(id,"+body.prefix+"_mail)) as token_me from "+body.table+" where "+body.prefix+"_name = '" + body.user + "' and "+body.prefix+"_token = sha1('" + body.password + "')", function (error, results, fields) {
        if (results.length > 0) {
            //auth ok
            const id = 1; //esse id viria do banco de dados
            const token = jwt.sign({ id }, process.env.MAIN_SECRET, {
                expiresIn: Number(process.env.TIME_TO_EXPIRE_SESSION), // minutes to expire
            });
            return res.json({ auth: true, token: token, token_me: results[0].token_me });
        } else {
            res.status(500).json({ message: "Login inválido!" });
        }
    });
}

//==========================================================================================================

// Consulta flexível em qualquer tabela baseada no 'id_name' e no 'id_value'
/*
    Os pré-requisitos para funcionamento:
        1- 'id_name' => nome do id em questão ( a ser definido na página da requisição )
        2- 'id_value' => valor a ser verificado para retorno
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getById = function(body, res){
    if (body.table && body.id_name && body.id_value) {
        execSQL("select * from " + body.table + " where " + body.id_name + " = '" + body.id_value + "'", res);
    } else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
}

//==========================================================================================================

// Consulta flexível em qualquer tabela baseada em um parâmetro 'LIKE' em uma coluna específica.
/*
    Os pré-requisitos para funcionamento:
        1- 'column_value' => valor a ser pesquisado.
        2- 'column_name' => nome da coluna.
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getByLikeParams = function(body, res){
    if (body.table && body.column_name && body.column_value) {
        execSQL("select * from " + body.table + " where " + body.column_name + " like '%" + body.column_value + "%'", res);
    } else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
}

//==========================================================================================================

// Consulta em qualquer tabela que possua relacionamento de usuário.
/*
    Os pré-requisitos para funcionamento:
        1- 'client_id' => id do usuário chave.
        2- 'column_name' => nome da coluna.
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getByClientId = function(body, res){
    if (body.table && body.column_name && body.client_id) {
        execSQL("select * from " + body.table + " where " + body.column_name + " = '" + body.client_id + "'", res);
    } else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
}

//==========================================================================================================


// Atualização flexível de qualquer tabela com base no id
/*
    Os pré-requisitos para funcionamento:
        1- 'fields' => array com as colunas e valores a serem atualizados.
        2- 'name_id' => nome da coluna primária.
        3- 'value_id' => valor do id a ser alterado.
        4- 'table' => nome da tabela ( a ser definida na página da requisição ).
    
    Retornos:
        1- Successo na update, sendo retorno padrão do mysql.
        2- Erro interno com detalhes do field em questão que gerou o problema em 'details'
*/
module.exports.updateById = function(body, res){
    if (body.table && body.fields.length > 0 && body.name_id && body.value_id) {
        var fields = body.fields,
            fieldSet = "";
        for (const k in fieldSet) {
            fieldSet += fields[k].column + " = " + fields[k].value + ",";
        }
        fieldSet = fieldSet + "where";
        fieldSet = fieldSet.replace(",where", " where ");

        execSQL("update " + body.table + " set " + fieldSet + " " + body.name_id + " = '" + body.value_id + "'", res);
    } else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
}

//==========================================================================================================

// Insere valores em qualquer tabela
/*
    Os pré-requisitos para funcionamento:
        1- 'fields' => array com as colunas e valores a serem atualizados.
        2- 'table' => nome da tabela ( a ser definida na página da requisição ).
    
    Retornos:
        1- Successo na update, sendo retorno padrão do mysql.
        2- Erro interno com detalhes do field em questão que gerou o problema em 'details'
*/
module.exports.insertNew = function(body, res){
    if (body.table.indexOf("user") > -1) {
        res.status(500).json({ message: "Users tables not authorized!" });
    } else {
        conn.query("desc " + body.table, async function (error, results, fields3) {
            if (!error) {
                var columns = [],
                    byUser = "",
                    byDB = " (";

                for (const k in results) {
                    byDB += results[k].Field + ", ";
                    if (results[k].Field != "id" && results[k].Field != "updatedAt" && results[k].Field != "createdAt") {
                        columns.push({ fieldName: results[k].Field, fieldType: results[k].Type });
                    }
                }
                byDB += ") ";
                byDB = byDB.replace(", )", ")");
                var fields = body.fields,
                    anomaly = [];
                for (const k in fields) {
                    for (const c in columns) {
                        if (fields[k].fieldName === columns[c].fieldName) {
                            if (columns[c].fieldType == "int(11)") {
                                byUser += Number(fields[k].value) + ", ";
                                if (!Number(fields[k].value)) {
                                    anomaly.push({ yourField: fields[k], dbField: columns[c] });
                                }
                                break;
                            }

                            if (columns[c].fieldType == "float") {
                                byUser += Number(fields[k].value) + ", ";
                                if (!Number(fields[k].value)) {
                                    anomaly.push({ yourField: fields[k], dbField: columns[c] });
                                }
                                break;
                            }

                            if (columns[c].fieldType == "datetime") {
                                byUser += "'" + fields[k].value + "', ";
                                if (isNaN(new Date(fields[k].value))) {
                                    anomaly.push({ yourField: fields[k], dbField: columns[c] });
                                }
                                break;
                            }

                            if (columns[c].fieldType == "text") {
                                byUser += "'" + fields[k].value + "', ";
                                break;
                            }
                            byUser += "'" + fields[k].value + "', ";
                        }
                    }
                }

                if (anomaly.length === 0 && fields.length == columns.length) {
                    execSQL("insert into " + body.table + "  " + byDB + " values (null, " + byUser + " now(), now())", res);
                } else {
                    res.status(500).json({ message: "Invalid fields!", Details: anomaly, ExpectedFields: columns, YourFields: fields });
                }
            } else {
                res.send(error);
            }
        });
    }
}

//==========================================================================================================

// Inicialização de novo usuário master, com verificação de já existência dos dados informados.
/*
    Os pré-requisitos para funcionamento:
        1- 'mail' => e-mail principal.
    Retornos:
        1- Successo na inserção e no envio do e-mail com o código de 5 dígitos.
        2- Erro interno com detalhes do field em questão que gerou o problema em 'details'
    
    Observação: 
        * Os parametros de conexão para envio de e-mail são setados nas variáveis de ambiente
*/
module.exports.startup = function(body, res){

   
    var code = Math.floor(Math.random() * 99999) + 11111;
    var message = {"to":body.mail,"from":'no-reply@weg.net',"subject":'Confirmação de e-mail.',"html":'<p>Olá seu código de verificação é <b style="font-size: 20px; font-weight: bold">'+code+'</b>.<br>Ele expira em 02 horas.<br>Validade: '+moment().add(2, 'hours').format("DD/MM/YYYY hh:mm:ss")+'</p>'}
                    
    var parameters = {
        "host": process.env.mail,
        "port": process.env.mail_port,
        "secure": process.env.secure,
        "auth": process.env.auth,
        "username": process.env.mail_user_name,
        "tls": process.env.tls
    }
    var anomaly =[]

    if(message.to && message.to != undefined && message.to != null && message.to.indexOf("@") >-1 ){}else{ anomaly.push({"field":"to", "toVerify": message.to}) }
   

    if(anomaly.length > 0){
        
        res.status(500).json({ messageError: "Invalid mail parameters or message!", details: anomaly, yourMessage: body });
    }else{
       
        conn.query('select * from users_masters where users_master_mail = sha1("'+body.mail+'")', async function (error2, results, fields) {
            if (!error2) {
                if(results.length > 0){
                    res.status(500).json({ message: "This e-mail already exists!", yourMessage: body });
                }else{
                    conn.query('insert into startupAndRecover values (null, sha1("'+body.mail+'"), '+code+', "'+moment().add(2, 'hours').format("YYYY-MM-DD hh:mm:ss")+'", "'+moment().format("YYYY-MM-DD hh:mm:ss")+'", "'+moment().format("YYYY-MM-DD hh:mm:ss")+'")', async function (error, results, fields) {
                        if (!error) {
                            var sender = sendMail(parameters, message);
            
                            res.send({"responseOK":true});
                        } else {
                            res.status(500).json({ messageError: "Problem with database!", errorSQL: error, details: anomaly, yourMessage: body });
                        }
                    });
                }

            } else {
                res.status(500).json({ messageError: "Problem with database!", errorSQL: error2, details: anomaly, yourMessage: body });
            }
        });
        
        
    }

    
}

//==========================================================================================================

// Envio de e-mail marketing ou informativo.
/*
    Os pré-requisitos para funcionamento:
        1- 'message' => array contendo os dados 'to, from, html, subject'.
    Retornos:
        1- Successo no envio do e-mail marketing.
        2- Erro interno com detalhes do field em questão que gerou o problema em 'details'
    
    Observação: 
        * Os parametros de conexão para envio de e-mail de marketing devem ser obtidos das filiais pra personalização de domínio.
*/
module.exports.sendNews = function(body, res){
    var message = body.message;

    var parameters = {};
   if(body.affiliate_id != null && body.affiliate_id != "" && body.affiliate_id != undefined){
    conn.query('select * from setup where affiliate_id = '+body.affiliate_id+' limit 1', async function (error, results, fields) {
        if (!error) {
           
           parameters =  {
                "host": results.host,
                "port": results.port,
                "secure": results.secure,
                "auth": results.auth,
                "username": results.mail_user_name,
                "tls": results.tls
            }

            var anomaly =[]
            //parameters verify
            if(parameters.host && parameters.host != undefined && parameters.host != null && Number(parameters.host)){}else{ anomaly.push({"field":"host", "toVerify": parameters.host}) }
            if(parameters.port && parameters.port != undefined && parameters.port != null && Number(parameters.port)){}else{ anomaly.push({"field":"port", "toVerify": parameters.port}) }
            if(parameters.secure != undefined && parameters.secure != null){}else{ anomaly.push({"field":"secure", "toVerify": parameters.secure}) }
            if(parameters.auth != undefined && parameters.auth != null){}else{ anomaly.push({"field":"auth", "toVerify": parameters.auth}) }
            if(parameters.username && parameters.username != undefined && parameters.username != null && parameters.username.indexOf("@") >-1){}else{ anomaly.push({"field":"username", "toVerify": parameters.username}) }
            if(parameters.tls != undefined && parameters.tls != null){}else{ anomaly.push({"field":"host", "toVerify": parameters.host}) }
            //message verify
            if(message.from != undefined && message.from != null && message.from.indexOf("@") >-1){}else{ anomaly.push({"field":"from", "toVerify": message.from}) }
            if(message.to != undefined && message.to != null && message.to.indexOf("@") >-1){}else{ anomaly.push({"field":"to", "toVerify": message.to}) }
            if(message.subject != undefined && message.subject != null){}else{ anomaly.push({"field":"subject", "toVerify": message.subject}) }
            if(message.html != undefined && message.html != null){}else{ anomaly.push({"field":"html", "toVerify": message.html}) }
            //anomalys verify
            if(anomaly.length > 0){
                res.status(500).json({ messageError: "Invalid mail parameters or message!", details: anomaly, youtParameters: parameters, yourMessage: message });
            }else{
                var sender = sendMail(parameters, message);
                res.send(sender);
            }

        } else {
            res.status(500).json({ messageError: "Problem with database!", yourData: body, txtError: error });
        }
    });

   }else{
    res.status(500).json({ messageError: "Affilaite ID not found!", yourData: body });
   }

    
    


    
   

    

    
}

//==========================================================================================================

// Valida o código de 5 dígitos enviado por e-mail.
/*
    Os pré-requisitos para funcionamento:
        1- 'token' => código de 5 dígitos recebido.
        2- 'mail' => e-mail do cliente que recebeu.
    Retornos:
        1- Successo na verificação.
        2- Verificação invalida.
    
*/
module.exports.getValidCode = function(body, res){
    if (body.token && body.mail) {
    
        conn.query("select * from startupAndRecover where verifyCode = "+body.token+" and mail = sha1('"+body.mail+"') and expires >= now()", async function (error, results, fields) {
            if (!error) {
                if(results.length > 0){
                    res.send({"resultOk": true, "results":results})
                }else{
                    res.status(500).json({ messageError: "No results found!", yourData: body });
                }
            } else {
                res.status(500).json({ messageError: "Problem with database!", errorSQL: error, details: anomaly, yourMessage: body });
            }
        });
        
    } else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
}





