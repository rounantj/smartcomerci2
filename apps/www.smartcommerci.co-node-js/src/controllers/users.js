/*======================= SMARTCOMMERCI USERS =========================== 

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Consultar e alterar os dados de usuários conforme as regras do negócio

=========================================================================*/



// Importando modelos e dependências
var users_masters = require('../models/users_masters');
var users_affiliates = require('../models/users_affiliates');
var users_clients = require('../models/users_clients');
const mysql = require("mysql");


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
// Parametros: query= 'QUERY SQL VÁLIDA'; res = 'RESPONSE'
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

// Exporta todos Usuários Master
// Parametros: 
module.exports.users_masters = function(err, res){
    users_masters.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
}


//==========================================================================================================

// Exporta todos Usuários Affiliates 
// Parametros: 
module.exports.users_affiliates = function(err, res){
    users_affiliates.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 


//==========================================================================================================

// Exporta todos Usuários Clients 
// Parametros: 
module.exports.users_clients = function(err, res){
    users_clients.findAll().then(data=>{
        if(!err){
            res.send(data)
        }
    })
} 

//==========================================================================================================

// Insere novo usuário contanto que não exista outro com mesmo e-mail
/* Parametros: 
        body= {
            'table'; 'users_clients' ou 'users_masters' ou 'users_affiliates', 
            'prefix': 'NOME DA TABELA SEM O 's' NO FIM. EX.: 'users_master', 
            'mail': 'E-MAIL DO NOVO USUÁRIO',
            'fields': 'ARRAY COM TODOS OS CAMPOS DA TABELA E SEUS RESPECTIVOS VALORES, EX.: 
                        [
                                {"fieldName":"users_client_affiliate_id" , "value": 1},  ==> Valor informado pelo ambiente da loja em questão ao ser acessada!
                                {"fieldName":"users_client_name" , "value": "Ronan Rodrigues"},
                                {"fieldName":"users_client_mail" , "value": "meuEmail@meuemail.com"},
                                {"fieldName":"users_client_token" , "value": "minhasenhaValida"},
                                {"fieldName":"users_client_cpf" , "value": 123456789102},
                                {"fieldName":"users_client_endereco" , "value": "Rua XXXX Nº XXXX"},
                                {"fieldName":"users_client_cep" , "value": "29000000"},
                                {"fieldName":"users_client_bairro" , "value": "Jacupemba"},
                                {"fieldName":"users_client_listas_compras" , "value": "Principal"},
                                {"fieldName":"users_client_cidade" , "value": "Aracruz"}
                        ]
            }
    Respostas:
            'Success' com os valores fieldCount, affectedRows, insertId, serverStatus e warningCount
            'Error' status 500, 'Internal Server Error' com 'responseJSON' => responseJSON: {message: "User mail already exists!"} ou Details: {'ExpectedFields: [Array], YourFields: [Array]}

*/
module.exports.insertNew = function(body, res){

    conn.query("select * from "+body.table+" where "+body.prefix+"_mail = sha1('"+body.mail+"')", async function (error, results, fields) {
        if (!error) {
            console.log(results)
            if(results.length > 0){
                res.status(500).json({ message: "User mail already exists!" });
            }else{
                if (body.table.indexOf("user") > -1) {
                    conn.query("desc " + body.table, async function (error, results, fields) {
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

                                        if (fields[k].fieldName.indexOf("token") > -1 || fields[k].fieldName.indexOf("mail") > -1) {
                                            byUser += "sha1('" + fields[k].value + "'), ";                                         
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
                } else {
                    res.status(500).json({ message: "Business tables not authorized!" });
                }

            }
        } else {
            res.send(error);
        }
    });
}

//==========================================================================================================

// Altera a senha conforme e-mail enviado
/*
body= {
            'table'; 'users_clients' ou 'users_masters' ou 'users_affiliates',
            'prefix': 'NOME DA TABELA SEM O 's' NO FIM. EX.: 'users_master', 
            'token_me': 'CHAVE TOKEN TO USUÁRIO ENVIADO NO E-MAIL DE RECUPERAÇÃO DE SENHA', 
            'mail': 'E-MAIL DO NOVO USUÁRIO', 
       }
Respostas:
            'Success' com os valores fieldCount, affectedRows, insertId, serverStatus e warningCount
*/
module.exports.recoverPassword = function(body, res){
    conn.query("select * from "+body.table+" where sha1(id,"+body.prefix+"_mail) =  '"+body.token_me+"'", async function (error, results, fields) {
        if(results.length > 0){
            if(body.new_token && body.prefix && body.table){
                execSQL("update "+body.table+" set "+body.prefix+"_token = sha1('"+body.new_token+"') where id = '"+body.user_id+"'",res);
            }else{
                res.status(500).json({ message: "Invalid parameters!", Details: body });
            } 

        }else{
            res.status(500).json({ message: "Invalid parameters!", Details: body });
        }
    });
 
      
}