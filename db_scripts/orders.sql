
# Modelo tradicional com cada campo em uma coluna específica

create table orders ( 
id integer not null auto_increment,  

# For relationship
order_affiliate_id integer not null, 
order_client_id integer not null, 

# Order data
order_status text,
order_data_entrega datetime,
order_metodo_pagamento text,
order_cpf_nf text,
order_tamanho_cesta text,
order_conteudo text, # Json stringify format
order_valor_total float,


updatedAt datetime,
createdAt datetime,
primary key (id));

