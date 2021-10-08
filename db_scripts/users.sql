# ========== Modelo tradicional com cada campo em uma coluna específica =============#

create table users_masters( 
id integer not null auto_increment,  
users_master_name text,
users_master_mail text,
users_master_token text,

updatedAt datetime,
createdAt datetime,
primary key (id));


create table users_affiliates( 
id integer not null auto_increment, 

# For relationship
users_affiliate_master_id integer not null,   

# Affiliate data
users_affiliate_name text,
users_affiliate_perfil text,
users_affiliate_mail text,
users_affiliate_token text,
updatedAt datetime,
createdAt datetime,
primary key (id));



create table users_clients( 
id integer not null auto_increment, 

# For relationship
users_client_affiliate_id integer not null,  

# Clients data
users_client_name text,
users_client_mail text,
users_client_token text,
users_client_cpf text,
users_client_endereco text,
users_client_cep text,
users_client_bairro text,
users_client_cidade text,
users_client_listas_compras text, 


updatedAt datetime,
createdAt datetime,
primary key (id));

show tables;
desc affiliates;
