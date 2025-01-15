drop table if exists roles cascade;
drop table if exists users cascade;
drop table if exists reimbursement cascade;

create table roles (
    roleId serial primary key,
    role varchar(255)
);

create table users (
    userId serial primary key,
    firstName varchar(255),
    lastName varchar(255),
    username varchar(255),
    password varchar(255),
    roleId int,
    foreign key (roleId) references roles(roleId)
);


create table reimbursement (
    reimbursementId serial primary key,
    description varchar(255),
    amount decimal(8,2),
    status varchar(255) not null,
    userId int not null,
    timePosted timestamptz default current_timestamp,
    project varchar(255),
    foreign key (userId) references users(userId)
);