<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)

# Modelo tradicional com cada campo em uma coluna específica

create table listas_compras ( 
id integer not null auto_increment,  

# For relationship
lista_affiliate_id integer not null, 
lista_client_id integer not null, 

# Order data
lista_name text,
lista_conteudo datetime,


updatedAt datetime,
createdAt datetime,
primary key (id));

<<<<<<< HEAD
=======

# Modelo tradicional com cada campo em uma coluna específica

create table listas_compras ( 
id integer not null auto_increment,  

# For relationship
lista_affiliate_id integer not null, 
lista_client_id integer not null, 

# Order data
lista_name text,
lista_conteudo datetime,


updatedAt datetime,
createdAt datetime,
primary key (id));

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
