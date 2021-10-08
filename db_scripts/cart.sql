# Modelo tradicional com cada campo em uma coluna específica

create table carts ( 
id integer not null auto_increment,  

# For relationship
cart_affiliate_id integer not null, 
cart_client_id integer not null, 

# cart data
cart_status text,
cart_conteudo text, # Json stringify format
cart_valor_total decimal,


updatedAt datetime,
createdAt datetime,
primary key (id));