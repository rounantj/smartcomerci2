(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/www.smartcommerci.co-node-js/src/controllers/business.js":
/*!***********************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/controllers/business.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*========= SMARTCOMMERCI BUSINESS ==========

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Consultar e alterar os dados conforme as regras do negócio

============================================*/
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
// Importando os modelos
var masters = __webpack_require__(/*! ../models/masters */ "./apps/www.smartcommerci.co-node-js/src/models/masters.js");
var affiliates = __webpack_require__(/*! ../models/affiliates */ "./apps/www.smartcommerci.co-node-js/src/models/affiliates.js");
var carts = __webpack_require__(/*! ../models/carts */ "./apps/www.smartcommerci.co-node-js/src/models/carts.js");
var orders = __webpack_require__(/*! ../models/orders */ "./apps/www.smartcommerci.co-node-js/src/models/orders.js");
var posts = __webpack_require__(/*! ../models/posts */ "./apps/www.smartcommerci.co-node-js/src/models/posts.js");
var listas_compras = __webpack_require__(/*! ../models/listas_compras */ "./apps/www.smartcommerci.co-node-js/src/models/listas_compras.js");
var products = __webpack_require__(/*! ../models/products */ "./apps/www.smartcommerci.co-node-js/src/models/products.js");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const mysql = __webpack_require__(/*! mysql */ "mysql");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
var moment = __webpack_require__(/*! moment */ "moment");
// Importando as variaveis de ambiente
__webpack_require__(/*! dotenv */ "dotenv").config();
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
function execSQL(query, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(query);
        conn.query(query, function (error, results, fields) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    res.send(results);
                }
                else {
                    res.send(error);
                }
            });
        });
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
function sendMail(parameters, message) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer.createTransport({
            host: parameters.host,
            port: parameters.port,
            secure: parameters.secure,
            auth: parameters.auth,
            username: parameters.username,
            tls: { rejectUnauthorized: parameters.tls }
        });
        const mailOptions = {
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: message.html
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Erro ao enviar!\n" + error);
                return error;
            }
            else {
                console.log("email enviado com sucesso!");
                return info.response;
            }
        });
    });
}
//==========================================================================================================
// Acionamento dos modelos 'findAll' do sequelize
module.exports.masters = function (err, res) {
    masters.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.affiliates = function (err, res) {
    affiliates.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.carts = function (err, res) {
    carts.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.posts = function (err, res) {
    posts.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.products = function (err, res) {
    products.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.orders = function (err, res) {
    orders.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
module.exports.listas_compras = function (err, res) {
    listas_compras.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
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
module.exports.me = function (body, res) {
    var query1 = "select 'CLIENT' as USER_PROFILE, users_clients.id as USER_ID, users_client_affiliate_id as USER_AFFILIATE_ID, users_client_name as USER_NAME, users_client_mail as USER_MAIL  from users_clients inner join users_affiliates where sha1(concat(users_clients.id,users_client_mail)) = '" + body.token_me + "'";
    var query2 = "select 'AFFILIATE' as USER_PROFILE, users_affiliates.id as USER_ID,users_affiliate_master_id as USER_MASTER_ID, users_affiliate_name as USER_NAME, users_affiliate_mail as USER_MAIL  from users_affiliates  inner join users_masters where sha1(concat(users_affiliates.id,users_affiliate_mail)) = '" + body.token_me + "'";
    var query3 = "select 'MASTER' as USER_PROFILE, id as USER_ID, users_master_name as USER_NAME, users_master_mail as USER_MAIL  from users_masters where sha1(concat(id,users_master_mail)) = '" + body.token_me + "'";
    conn.query(query1, function (error, results, fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!error) {
                if (results.length > 0) {
                    res.send(results);
                }
                else {
                    conn.query(query2, function (error2, results2, fields2) {
                        return tslib_1.__awaiter(this, void 0, void 0, function* () {
                            if (!error2) {
                                if (results2.length > 0) {
                                    res.send(results2);
                                }
                                else {
                                    conn.query(query3, function (error3, results3, fields3) {
                                        return tslib_1.__awaiter(this, void 0, void 0, function* () {
                                            if (!error3) {
                                                if (results3.length > 0) {
                                                    res.send(results3);
                                                }
                                                else {
                                                    res.status(404).json({ message: "User not found!" });
                                                }
                                            }
                                            else {
                                                res.send(error3);
                                            }
                                        });
                                    });
                                }
                            }
                            else {
                                res.send(error2);
                            }
                        });
                    });
                }
            }
            else {
                res.send(error);
            }
        });
    });
};
//==========================================================================================================
// Realiza o login se valendo da 'SECRET_KEY' do JWT com tempo de expiração definido em 'TIME_TO_EXPIRE_SESSION' das váriáveis de ambiente.
/*
    Os pré-requisitos para funcionamento:
        1- 'prefix' => prefixo da tabela baseado no tipo de usuário. Ex.: 'affiliate','master' ou 'client'
        2- 'token' => password enviado pelo cliente para ser criptografado e salvo com sha1.
        3- 'user' => nome do usuário.
        4- 'table' => nome da tabela a ser modificada ( definida com base no tipo do usuário ).
*/
module.exports.login = function (body, res) {
    conn.query("select *, sha1(concat(id," + body.prefix + "_mail)) as token_me from " + body.table + " where " + body.prefix + "_name = '" + body.user + "' and " + body.prefix + "_token = sha1('" + body.password + "')", function (error, results, fields) {
        if (results.length > 0) {
            //auth ok
            const id = 1; //esse id viria do banco de dados
            const token = jwt.sign({ id }, process.env.MAIN_SECRET, {
                expiresIn: Number(process.env.TIME_TO_EXPIRE_SESSION), // minutes to expire
            });
            return res.json({ auth: true, token: token, token_me: results[0].token_me });
        }
        else {
            res.status(500).json({ message: "Login inválido!" });
        }
    });
};
//==========================================================================================================
// Consulta flexível em qualquer tabela baseada no 'id_name' e no 'id_value'
/*
    Os pré-requisitos para funcionamento:
        1- 'id_name' => nome do id em questão ( a ser definido na página da requisição )
        2- 'id_value' => valor a ser verificado para retorno
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getById = function (body, res) {
    if (body.table && body.id_name && body.id_value) {
        execSQL("select * from " + body.table + " where " + body.id_name + " = '" + body.id_value + "'", res);
    }
    else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
};
//==========================================================================================================
// Consulta flexível em qualquer tabela baseada em um parâmetro 'LIKE' em uma coluna específica.
/*
    Os pré-requisitos para funcionamento:
        1- 'column_value' => valor a ser pesquisado.
        2- 'column_name' => nome da coluna.
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getByLikeParams = function (body, res) {
    if (body.table && body.column_name && body.column_value) {
        execSQL("select * from " + body.table + " where " + body.column_name + " like '%" + body.column_value + "%'", res);
    }
    else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
};
//==========================================================================================================
// Consulta em qualquer tabela que possua relacionamento de usuário.
/*
    Os pré-requisitos para funcionamento:
        1- 'client_id' => id do usuário chave.
        2- 'column_name' => nome da coluna.
        3- 'table' => nome da tabela ( a ser definida na página da requisição ).
*/
module.exports.getByClientId = function (body, res) {
    if (body.table && body.column_name && body.client_id) {
        execSQL("select * from " + body.table + " where " + body.column_name + " = '" + body.client_id + "'", res);
    }
    else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
};
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
module.exports.updateById = function (body, res) {
    if (body.table && body.fields.length > 0 && body.name_id && body.value_id) {
        var fields = body.fields, fieldSet = "";
        for (const k in fieldSet) {
            fieldSet += fields[k].column + " = " + fields[k].value + ",";
        }
        fieldSet = fieldSet + "where";
        fieldSet = fieldSet.replace(",where", " where ");
        execSQL("update " + body.table + " set " + fieldSet + " " + body.name_id + " = '" + body.value_id + "'", res);
    }
    else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
};
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
module.exports.insertNew = function (body, res) {
    if (body.table.indexOf("user") > -1) {
        res.status(500).json({ message: "Users tables not authorized!" });
    }
    else {
        conn.query("desc " + body.table, function (error, results, fields3) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    var columns = [], byUser = "", byDB = " (";
                    for (const k in results) {
                        byDB += results[k].Field + ", ";
                        if (results[k].Field != "id" && results[k].Field != "updatedAt" && results[k].Field != "createdAt") {
                            columns.push({ fieldName: results[k].Field, fieldType: results[k].Type });
                        }
                    }
                    byDB += ") ";
                    byDB = byDB.replace(", )", ")");
                    var fields = body.fields, anomaly = [];
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
                    }
                    else {
                        res.status(500).json({ message: "Invalid fields!", Details: anomaly, ExpectedFields: columns, YourFields: fields });
                    }
                }
                else {
                    res.send(error);
                }
            });
        });
    }
};
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
module.exports.startup = function (body, res) {
    var code = Math.floor(Math.random() * 99999) + 11111;
    var message = { "to": body.mail, "from": 'no-reply@weg.net', "subject": 'Confirmação de e-mail.', "html": '<p>Olá seu código de verificação é <b style="font-size: 20px; font-weight: bold">' + code + '</b>.<br>Ele expira em 02 horas.<br>Validade: ' + moment().add(2, 'hours').format("DD/MM/YYYY hh:mm:ss") + '</p>' };
    var parameters = {
        "host": process.env.mail,
        "port": process.env.mail_port,
        "secure": process.env.secure,
        "auth": process.env.auth,
        "username": process.env.mail_user_name,
        "tls": process.env.tls
    };
    var anomaly = [];
    if (message.to && message.to != undefined && message.to != null && message.to.indexOf("@") > -1) { }
    else {
        anomaly.push({ "field": "to", "toVerify": message.to });
    }
    if (anomaly.length > 0) {
        res.status(500).json({ messageError: "Invalid mail parameters or message!", details: anomaly, yourMessage: body });
    }
    else {
        conn.query('select * from users_masters where users_master_mail = sha1("' + body.mail + '")', function (error2, results, fields) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error2) {
                    if (results.length > 0) {
                        res.status(500).json({ message: "This e-mail already exists!", yourMessage: body });
                    }
                    else {
                        conn.query('insert into startupAndRecover values (null, sha1("' + body.mail + '"), ' + code + ', "' + moment().add(2, 'hours').format("YYYY-MM-DD hh:mm:ss") + '", "' + moment().format("YYYY-MM-DD hh:mm:ss") + '", "' + moment().format("YYYY-MM-DD hh:mm:ss") + '")', function (error, results, fields) {
                            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                                if (!error) {
                                    var sender = sendMail(parameters, message);
                                    res.send({ "responseOK": true });
                                }
                                else {
                                    res.status(500).json({ messageError: "Problem with database!", errorSQL: error, details: anomaly, yourMessage: body });
                                }
                            });
                        });
                    }
                }
                else {
                    res.status(500).json({ messageError: "Problem with database!", errorSQL: error2, details: anomaly, yourMessage: body });
                }
            });
        });
    }
};
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
module.exports.sendNews = function (body, res) {
    var message = body.message;
    var parameters = {};
    if (body.affiliate_id != null && body.affiliate_id != "" && body.affiliate_id != undefined) {
        conn.query('select * from setup where affiliate_id = ' + body.affiliate_id + ' limit 1', function (error, results, fields) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    parameters = {
                        "host": results.host,
                        "port": results.port,
                        "secure": results.secure,
                        "auth": results.auth,
                        "username": results.mail_user_name,
                        "tls": results.tls
                    };
                    var anomaly = [];
                    //parameters verify
                    if (parameters.host && parameters.host != undefined && parameters.host != null && Number(parameters.host)) { }
                    else {
                        anomaly.push({ "field": "host", "toVerify": parameters.host });
                    }
                    if (parameters.port && parameters.port != undefined && parameters.port != null && Number(parameters.port)) { }
                    else {
                        anomaly.push({ "field": "port", "toVerify": parameters.port });
                    }
                    if (parameters.secure != undefined && parameters.secure != null) { }
                    else {
                        anomaly.push({ "field": "secure", "toVerify": parameters.secure });
                    }
                    if (parameters.auth != undefined && parameters.auth != null) { }
                    else {
                        anomaly.push({ "field": "auth", "toVerify": parameters.auth });
                    }
                    if (parameters.username && parameters.username != undefined && parameters.username != null && parameters.username.indexOf("@") > -1) { }
                    else {
                        anomaly.push({ "field": "username", "toVerify": parameters.username });
                    }
                    if (parameters.tls != undefined && parameters.tls != null) { }
                    else {
                        anomaly.push({ "field": "host", "toVerify": parameters.host });
                    }
                    //message verify
                    if (message.from != undefined && message.from != null && message.from.indexOf("@") > -1) { }
                    else {
                        anomaly.push({ "field": "from", "toVerify": message.from });
                    }
                    if (message.to != undefined && message.to != null && message.to.indexOf("@") > -1) { }
                    else {
                        anomaly.push({ "field": "to", "toVerify": message.to });
                    }
                    if (message.subject != undefined && message.subject != null) { }
                    else {
                        anomaly.push({ "field": "subject", "toVerify": message.subject });
                    }
                    if (message.html != undefined && message.html != null) { }
                    else {
                        anomaly.push({ "field": "html", "toVerify": message.html });
                    }
                    //anomalys verify
                    if (anomaly.length > 0) {
                        res.status(500).json({ messageError: "Invalid mail parameters or message!", details: anomaly, youtParameters: parameters, yourMessage: message });
                    }
                    else {
                        var sender = sendMail(parameters, message);
                        res.send(sender);
                    }
                }
                else {
                    res.status(500).json({ messageError: "Problem with database!", yourData: body, txtError: error });
                }
            });
        });
    }
    else {
        res.status(500).json({ messageError: "Affilaite ID not found!", yourData: body });
    }
};
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
module.exports.getValidCode = function (body, res) {
    if (body.token && body.mail) {
        conn.query("select * from startupAndRecover where verifyCode = " + body.token + " and mail = sha1('" + body.mail + "') and expires >= now()", function (error, results, fields) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    if (results.length > 0) {
                        res.send({ "resultOk": true, "results": results });
                    }
                    else {
                        res.status(500).json({ messageError: "No results found!", yourData: body });
                    }
                }
                else {
                    res.status(500).json({ messageError: "Problem with database!", errorSQL: error, details: anomaly, yourMessage: body });
                }
            });
        });
    }
    else {
        res.status(500).json({ message: "Invalid data parameters!" });
    }
};


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/controllers/documentation.js":
/*!****************************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/controllers/documentation.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var fs = __webpack_require__(/*! fs */ "fs");
const fs_Promises = __webpack_require__(/*! fs */ "fs").promises;
module.exports.getDocumentation = function (res) {
    fs.readFile("./apps/www.smartcommerci.co-node-js/src/data/documents.json", "utf8", function (err, result) {
        var data2 = JSON.parse(result);
        data2 = data2.documents;
        var data = [];
        if (!err) {
            start();
            // Function to get code of the files
            function start() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    for (const k in data2) {
                        var path = data2[k].file.toString();
                        const pathNames = yield fs_Promises.readFile(path);
                        var language = "javascript";
                        if (path.split(".")[path.split(".").length - 1] == "ejs") {
                            language = "language-html";
                        }
                        if (path.split(".")[path.split(".").length - 1] == "css") {
                            language = "language-css";
                        }
                        if (path.split(".")[path.split(".").length - 1] == "handlebars") {
                            language = "language-html";
                        }
                        data.push({
                            file: data2[k].file,
                            details: data2[k].details,
                            dependeces: data2[k].dependeces,
                            language: language,
                            context: pathNames.toString().trim()
                        });
                    }
                    res.render("documentation", { documents: data });
                });
            }
        }
    });
};


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/controllers/users.js":
/*!********************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/controllers/users.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*======================= SMARTCOMMERCI USERS ===========================

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Consultar e alterar os dados de usuários conforme as regras do negócio

=========================================================================*/
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
// Importando modelos e dependências
var users_masters = __webpack_require__(/*! ../models/users_masters */ "./apps/www.smartcommerci.co-node-js/src/models/users_masters.js");
var users_affiliates = __webpack_require__(/*! ../models/users_affiliates */ "./apps/www.smartcommerci.co-node-js/src/models/users_affiliates.js");
var users_clients = __webpack_require__(/*! ../models/users_clients */ "./apps/www.smartcommerci.co-node-js/src/models/users_clients.js");
const mysql = __webpack_require__(/*! mysql */ "mysql");
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
function execSQL(query, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(query);
        conn.query(query, function (error, results, fields) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!error) {
                    res.send(results);
                }
                else {
                    res.send(error);
                }
            });
        });
    });
}
//==========================================================================================================
// Exporta todos Usuários Master
// Parametros: 
module.exports.users_masters = function (err, res) {
    users_masters.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
//==========================================================================================================
// Exporta todos Usuários Affiliates 
// Parametros: 
module.exports.users_affiliates = function (err, res) {
    users_affiliates.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
//==========================================================================================================
// Exporta todos Usuários Clients 
// Parametros: 
module.exports.users_clients = function (err, res) {
    users_clients.findAll().then(data => {
        if (!err) {
            res.send(data);
        }
    });
};
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
module.exports.insertNew = function (body, res) {
    conn.query("select * from " + body.table + " where " + body.prefix + "_mail = sha1('" + body.mail + "')", function (error, results, fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!error) {
                console.log(results);
                if (results.length > 0) {
                    res.status(500).json({ message: "User mail already exists!" });
                }
                else {
                    if (body.table.indexOf("user") > -1) {
                        conn.query("desc " + body.table, function (error, results, fields) {
                            var fields, anomaly;
                            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                                if (!error) {
                                    var columns = [], byUser = "", byDB = " (";
                                    for (const k in results) {
                                        byDB += results[k].Field + ", ";
                                        if (results[k].Field != "id" && results[k].Field != "updatedAt" && results[k].Field != "createdAt") {
                                            columns.push({ fieldName: results[k].Field, fieldType: results[k].Type });
                                        }
                                    }
                                    byDB += ") ";
                                    byDB = byDB.replace(", )", ")");
                                    fields = body.fields, anomaly = [];
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
                                    }
                                    else {
                                        res.status(500).json({ message: "Invalid fields!", Details: anomaly, ExpectedFields: columns, YourFields: fields });
                                    }
                                }
                                else {
                                    res.send(error);
                                }
                            });
                        });
                    }
                    else {
                        res.status(500).json({ message: "Business tables not authorized!" });
                    }
                }
            }
            else {
                res.send(error);
            }
        });
    });
};
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
module.exports.recoverPassword = function (body, res) {
    conn.query("select * from " + body.table + " where sha1(id," + body.prefix + "_mail) =  '" + body.token_me + "'", function (error, results, fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (results.length > 0) {
                if (body.new_token && body.prefix && body.table) {
                    execSQL("update " + body.table + " set " + body.prefix + "_token = sha1('" + body.new_token + "') where id = '" + body.user_id + "'", res);
                }
                else {
                    res.status(500).json({ message: "Invalid parameters!", Details: body });
                }
            }
            else {
                res.status(500).json({ message: "Invalid parameters!", Details: body });
            }
        });
    });
};


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/main.js":
/*!*******************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/main.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*======================= SMARTCOMMERCI MAIN ===========================

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Script principal que orquestra os controladores, as rotas e os modelos de  dados

=========================================================================*/
// Chamando dependências e configurando o app
var express = __webpack_require__(/*! express */ "express");
var consign = __webpack_require__(/*! consign */ "consign");
var app = express();
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./apps/www.smartcommerci.co-node-js/src/public"));
const cors = __webpack_require__(/*! cors */ "cors");
app.use(express.json());
var fs = __webpack_require__(/*! fs */ "fs");
const fs_Promises = __webpack_require__(/*! fs */ "fs").promises;
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
// Configurando a engine de views para a documentação web
app.set('views', './apps/www.smartcommerci.co-node-js/src/views');
app.set('view engine', 'ejs');
// Importando as variaveis de ambiente
__webpack_require__(/*! dotenv */ "dotenv").config();
// Ajuste de CROSS DOMAIN para reutilização da API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});
// Função principal para JWT ( Jason Web Token ), validando todas as conexões com os end-points
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).json({ auth: false, message: "No token provided." });
    jwt.verify(token, process.env.MAIN_SECRET, function (err, decoded) {
        console.log(decoded);
        if (err)
            return res.status(500).json({ auth: false, message: "Failed to authenticate token." });
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}
// Inserindo Rotas e Regras de Negócio
var routes = __webpack_require__(/*! ./routes/routes */ "./apps/www.smartcommerci.co-node-js/src/routes/routes.js");
__webpack_require__(/*! ./controllers/business */ "./apps/www.smartcommerci.co-node-js/src/controllers/business.js");
__webpack_require__(/*! ./controllers/users */ "./apps/www.smartcommerci.co-node-js/src/controllers/users.js");
// Chamando as rotas
routes.login(app, verifyJWT);
routes.getByClientId(app, verifyJWT);
routes.getById(app, verifyJWT);
routes.getByLikeParams(app, verifyJWT);
routes.updateById(app, verifyJWT);
routes.insertNew(app, verifyJWT);
routes.newLoginInsert(app, verifyJWT);
routes.me(app, verifyJWT);
routes.recoverPassword(app, verifyJWT);
routes.documentation(app);
routes.startup(app, verifyJWT);
routes.sendNews(app, verifyJWT);
routes.getValidCode(app, verifyJWT);
routes.myColors(app, verifyJWT);
routes.uploadLogo(app, verifyJWT);
// Apontando a porta e ouvindo as requests
app.listen(process.env.PORT_APPLICATION, function () {
    console.log("Port " + process.env.PORT_APPLICATION);
});


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/affiliates.js":
/*!********************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/affiliates.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const affiliates = db.sequelize.define('affiliates', {
    affiliates_master_id: {
        type: db.Sequelize.INTEGER
    },
    affiliates_business_name: {
        type: db.Sequelize.STRING
    },
    affiliates_business_telefone: {
        type: db.Sequelize.STRING
    },
    affiliates_business_mail: {
        type: db.Sequelize.STRING
    },
    affiliates_business_horario: {
        type: db.Sequelize.STRING
    },
    affiliates_business_endereco: {
        type: db.Sequelize.STRING
    },
    affiliates_business_numero: {
        type: db.Sequelize.STRING
    },
    affiliates_business_cep: {
        type: db.Sequelize.STRING
    },
    affiliates_business_cidade: {
        type: db.Sequelize.STRING
    },
    affiliates_business_estado: {
        type: db.Sequelize.STRING
    }
});
module.exports = affiliates;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/carts.js":
/*!***************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/carts.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const carts = db.sequelize.define('carts', {
    cart_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    cart_client_id: {
        type: db.Sequelize.INTEGER
    },
    cart_status: {
        type: db.Sequelize.STRING
    },
    cart_conteudo: {
        type: db.Sequelize.STRING
    },
    cart_valor_total: {
        type: db.Sequelize.FLOAT
    }
});
module.exports = carts;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/db.js":
/*!************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/db.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*=========== Database Settings Default for Sequelize ===========

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Definir as configurações do módulo Sequelize testar a conexão
           e exportar o serviço.

=================================================================*/
// Importando dependencias
const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
const Op = Sequelize.Op;
// Setando credenciais
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: 'mysql'
});
// Testando conexão
sequelize.authenticate().then(function () {
    console.log("Connection ok!");
}).catch(function (erro) {
    console.log("Throw error db: " + erro);
});
module.exports = {
    Sequelize: Sequelize,
    Op: Op,
    sequelize: sequelize
};


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/listas_compras.js":
/*!************************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/listas_compras.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const listas_compras = db.sequelize.define('listas_compras', {
    lista_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    lista_client_id: {
        type: db.Sequelize.INTEGER
    },
    lista_name: {
        type: db.Sequelize.STRING
    },
    lista_conteudo: {
        type: db.Sequelize.STRING
    }
});
module.exports = listas_compras;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/masters.js":
/*!*****************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/masters.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const masters = db.sequelize.define('masters', {
    master_business_name: {
        type: db.Sequelize.STRING
    },
    master_business_cnpj: {
        type: db.Sequelize.STRING
    },
    master_business_razao: {
        type: db.Sequelize.STRING
    },
    master_business_telefone: {
        type: db.Sequelize.STRING
    },
    master_business_mail: {
        type: db.Sequelize.STRING
    },
    master_business_horario: {
        type: db.Sequelize.STRING
    },
    master_business_endereco: {
        type: db.Sequelize.STRING
    },
    master_business_numero: {
        type: db.Sequelize.STRING
    },
    master_business_cep: {
        type: db.Sequelize.STRING
    },
    master_business_cidade: {
        type: db.Sequelize.STRING
    },
    master_business_estado: {
        type: db.Sequelize.STRING
    },
    master_custom_segmento: {
        type: db.Sequelize.STRING
    },
    master_custom_logo: {
        type: db.Sequelize.STRING
    },
    master_custom_cor_primeira: {
        type: db.Sequelize.STRING
    },
    master_custom_cor_segunda: {
        type: db.Sequelize.STRING
    },
    master_custom_cor_terceira: {
        type: db.Sequelize.STRING
    },
    master_custom_cor_quarta: {
        type: db.Sequelize.STRING
    },
    master_custom_categorias: {
        type: db.Sequelize.STRING
    },
    master_custom_ferramentas: {
        type: db.Sequelize.STRING
    }
});
module.exports = masters;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/orders.js":
/*!****************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/orders.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const orders = db.sequelize.define('orders', {
    order_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    order_client_id: {
        type: db.Sequelize.INTEGER
    },
    order_status: {
        type: db.Sequelize.STRING
    },
    order_data_entrega: {
        type: db.Sequelize.DATE
    },
    order_metodo_pagamento: {
        type: db.Sequelize.STRING
    },
    order_cpf_nf: {
        type: db.Sequelize.STRING
    },
    order_tamanho_cesta: {
        type: db.Sequelize.STRING
    },
    order_conteudo: {
        type: db.Sequelize.STRING
    },
    order_valor_total: {
        type: db.Sequelize.FLOAT
    }
});
module.exports = orders;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/posts.js":
/*!***************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/posts.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const posts = db.sequelize.define('posts', {
    post_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    post_titulo: {
        type: db.Sequelize.STRING
    },
    post_chamada: {
        type: db.Sequelize.STRING
    },
    post_categoria: {
        type: db.Sequelize.STRING
    },
    post_etiquetas: {
        type: db.Sequelize.STRING
    },
    post_conteudo: {
        type: db.Sequelize.STRING
    }
});
module.exports = posts;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/products.js":
/*!******************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/products.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const products = db.sequelize.define('products', {
    product_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    product_descricao: {
        type: db.Sequelize.STRING
    },
    product_valor: {
        type: db.Sequelize.FLOAT
    },
    product_categoria: {
        type: db.Sequelize.STRING
    },
    product_fabricacao: {
        type: db.Sequelize.STRING
    },
    product_estoque: {
        type: db.Sequelize.INTEGER
    },
    product_medida: {
        type: db.Sequelize.STRING
    },
    product_etiquetas: {
        type: db.Sequelize.STRING
    }
});
module.exports = products;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/users_affiliates.js":
/*!**************************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/users_affiliates.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const users_affiliates = db.sequelize.define('users_affiliates', {
    users_affiliate_master_id: {
        type: db.Sequelize.INTEGER
    },
    users_affiliate_name: {
        type: db.Sequelize.STRING
    },
    users_affiliate_perfil: {
        type: db.Sequelize.STRING
    },
    users_affiliate_mail: {
        type: db.Sequelize.STRING
    },
    users_affiliate_token: {
        type: db.Sequelize.STRING
    }
});
module.exports = users_affiliates;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/users_clients.js":
/*!***********************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/users_clients.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const users_clients = db.sequelize.define('users_clients', {
    users_client_affiliate_id: {
        type: db.Sequelize.INTEGER
    },
    users_client_name: {
        type: db.Sequelize.STRING
    },
    users_client_mail: {
        type: db.Sequelize.STRING
    },
    users_client_token: {
        type: db.Sequelize.STRING
    },
    users_client_cpf: {
        type: db.Sequelize.STRING
    },
    users_client_endereco: {
        type: db.Sequelize.STRING
    },
    users_client_cep: {
        type: db.Sequelize.STRING
    },
    users_client_bairro: {
        type: db.Sequelize.STRING
    },
    users_client_cidade: {
        type: db.Sequelize.STRING
    },
    users_client_listas_compras: {
        type: db.Sequelize.STRING
    }
});
module.exports = users_clients;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/models/users_masters.js":
/*!***********************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/models/users_masters.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ./db */ "./apps/www.smartcommerci.co-node-js/src/models/db.js");
const users_master = db.sequelize.define('users_masters', {
    users_master_name: {
        type: db.Sequelize.STRING
    },
    users_master_mail: {
        type: db.Sequelize.STRING
    },
    users_master_token: {
        type: db.Sequelize.STRING
    }
});
module.exports = users_master;


/***/ }),

/***/ "./apps/www.smartcommerci.co-node-js/src/routes/routes.js":
/*!****************************************************************!*\
  !*** ./apps/www.smartcommerci.co-node-js/src/routes/routes.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*======================= SMARTCOMMERCI ROUTES ===========================================================

Author: Ronan Rodrigues
Contact: Tel.: 27 996011204, Mail: ronan.rodrigues@pullup.tech
Objective: Definir as rotas da API

=========================================================================================================*/
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
// Obetendo as dependências
var business = __webpack_require__(/*! ../controllers/business */ "./apps/www.smartcommerci.co-node-js/src/controllers/business.js");
var users = __webpack_require__(/*! ../controllers/users */ "./apps/www.smartcommerci.co-node-js/src/controllers/users.js");
var documentation = __webpack_require__(/*! ../controllers/documentation */ "./apps/www.smartcommerci.co-node-js/src/controllers/documentation.js");
//==========================================================================================================
// Rota para login
module.exports.login = function (app, verifyJWT) {
    app.post("/login", function (req, res) {
        business.login(req.body, res);
    });
};
//==========================================================================================================
// Rota para busca baseada no ID
module.exports.getById = function (app, verifyJWT) {
    app.post("/getById", verifyJWT, function (req, res) {
        business.getById(req.body, res);
    });
};
//==========================================================================================================
// Rota para busca baseada em um parâmetro 'LIKE'
module.exports.getByLikeParams = function (app, verifyJWT) {
    app.post("/getByLikeParams", verifyJWT, function (req, res) {
        business.getByLikeParams(req.body, res);
    });
};
//==========================================================================================================
// Rota para busca baseada em usuário chave
module.exports.getByClientId = function (app, verifyJWT) {
    app.post("/getByClientId", verifyJWT, function (req, res) {
        business.getByClientId(req.body, res);
    });
};
//==========================================================================================================
// Rota para update de dados pelo ID
module.exports.updateById = function (app, verifyJWT) {
    app.post("/updateById", verifyJWT, function (req, res) {
        business.updateById(req.body, res);
    });
};
//==========================================================================================================
// Rota para inserir dados em tabelas
module.exports.insertNew = function (app, verifyJWT) {
    app.post("/insertNew", verifyJWT, function (req, res) {
        business.insertNew(req.body, res);
    });
};
//==========================================================================================================
// Rota para inserir um novo usuário ( tratado de forma separa das outras tabelas )
module.exports.newLoginInsert = function (app, verifyJWT) {
    app.post("/newLoginInsert", verifyJWT, function (req, res) {
        users.insertNew(req.body, res);
    });
};
//==========================================================================================================
// Rota para recuperar password
module.exports.recoverPassword = function (app, verifyJWT) {
    app.post("/recoverPassword", verifyJWT, function (req, res) {
        users.recoverPassword(req.body, res);
    });
};
//==========================================================================================================
// Rota para identificar usuário
module.exports.me = function (app, verifyJWT) {
    app.post("/me", verifyJWT, function (req, res) {
        business.me(req.body, res);
    });
};
//==========================================================================================================
// Rota para a documentação
module.exports.documentation = function (app) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.get("/documentation", function (req, res) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                documentation.getDocumentation(res);
            });
        });
    });
};
//==========================================================================================================
// Rota para primeiro acesso como matriz
module.exports.startup = function (app, verifyJWT) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.post("/startup", verifyJWT, function (req, res) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                business.startup(req.body, res);
            });
        });
    });
};
//==========================================================================================================
// Rota para envio de e-mail marketing
module.exports.sendNews = function (app, verifyJWT) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.post("/sendNews", verifyJWT, function (req, res) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                business.sendNews(req.body, res);
            });
        });
    });
};
//==========================================================================================================
// Rota para verificar código de 5 dígitos
module.exports.getValidCode = function (app, verifyJWT) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.post("/getValidCode", verifyJWT, function (req, res) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                business.getValidCode(req.body, res);
            });
        });
    });
};
//==========================================================================================================
// Rota para realizar upload da logotipo
module.exports.uploadLogo = function (app, verifyJWT) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.post('/uploadLogo', verifyJWT, (req, res) => {
            try {
                const formidable = __webpack_require__(/*! formidable */ "formidable");
                const fs = __webpack_require__(/*! fs */ "fs");
                const form = new formidable.IncomingForm();
                const dir = "./apps/www.smartcommerci.co-node-js/src/data/images/" + req.headers.user_id;
                //Verifica se não existe
                if (!fs.existsSync(dir)) {
                    //Efetua a criação do diretório
                    fs.mkdirSync(dir);
                }
                form.parse(req, (err, fields, files) => {
                    const path = __webpack_require__(/*! path */ "path");
                    const oldpath = files.fileimage.path;
                    const newpath = path.join("", './apps/www.smartcommerci.co-node-js/src/data/images/' + req.headers.user_id + '/', files.fileimage.name);
                    fs.renameSync(oldpath, newpath);
                    res.send({ "resultOk": true, "message": "File uploaded" });
                });
            }
            catch (error) {
                res.status(500).json({ message: "Invalid data parameters!", errorMessage: error });
            }
        });
    });
};
//==========================================================================================================
// Rota para coletar as cores da logotipo enviada
module.exports.myColors = function (app, verifyJWT) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.post("/myColors", function (req, res) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                const path = __webpack_require__(/*! path */ "path");
                const getColors = __webpack_require__(/*! get-image-colors */ "get-image-colors");
                getColors(path.join("./apps/www.smartcommerci.co-node-js/src/data/images/" + req.headers.user_id + "/", req.body.file)).then(colors => {
                    res.send(colors);
                });
            });
        });
    });
};


/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./apps/www.smartcommerci.co-node-js/src/main.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\PullUp\GIT\smartcomerci2\apps\www.smartcommerci.co-node-js\src\main.js */"./apps/www.smartcommerci.co-node-js/src/main.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "consign":
/*!**************************!*\
  !*** external "consign" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("consign");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("formidable");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "get-image-colors":
/*!***********************************!*\
  !*** external "get-image-colors" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("get-image-colors");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map