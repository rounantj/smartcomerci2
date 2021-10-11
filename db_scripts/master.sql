create table masters ( 
id integer not null auto_increment,  

# Business data
master_business_name text,
master_business_cnpj text,
master_business_razao text,
master_business_telefone text,
master_business_mail text,
master_business_horario text,
master_business_endereco text,
master_business_numero text,
master_business_cep text,
master_business_cidade text,
master_business_estado text,

# Custom data
master_custom_segmento text,
master_custom_logo text,
master_custom_cor_primeira text,
master_custom_cor_segunda text,
master_custom_cor_terceira text,
master_custom_cor_quarta text,
master_custom_categorias text,
master_custom_ferramentas text,


updatedAt datetime,
createdAt datetime,
primary key (id));


