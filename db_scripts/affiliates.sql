create table affiliates ( 
id integer not null auto_increment,  

# For relationship
affiliates_master_id integer not null, 

# Users affiliates data
affiliates_business_name text,
affiliates_business_telefone text,
affiliates_business_mail text,
affiliates_business_horario text,
affiliates_business_endereco text,
affiliates_business_numero text,
affiliates_business_cep text,
affiliates_business_cidade text,
affiliates_business_estado text,

# The affiliates custom data extends from master 



updatedAt datetime,
createdAt datetime,
primary key (id));
