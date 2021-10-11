
# Modelo tradicional com cada campo em uma coluna específica

create table products ( 
id integer not null auto_increment,  

# For relationship
product_affiliate_id integer not null, 

# Product data
product_descricao text,
product_valor float,
product_categoria text,
product_fabricacao text,
product_estoque integer,
product_medida text,
product_etiquetas text,


updatedAt datetime,
createdAt datetime,
primary key (id));