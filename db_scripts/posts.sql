
# Modelo tradicional com cada campo em uma coluna específica

create table posts ( 
id integer not null auto_increment,  

# For relationship
post_affiliate_id integer not null, 

# Post data
post_titulo text,
post_chamada text,
post_categoria text,
post_etiquetas text,
post_conteudo text,
updatedAt datetime,
createdAt datetime,
primary key (id));

show tables;