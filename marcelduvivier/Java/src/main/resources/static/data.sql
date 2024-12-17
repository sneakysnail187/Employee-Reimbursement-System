drop table if exists user;
drop table if exists reimbursement;
create table reimbursement (
    reimbursementId int primary key auto_increment,
    description varchar(255),
    amount decimal(8,2),
    status varchar(255) not null,
    userId int not null,
    foreign key (userId) references user(userId)
);
create table user (
    userId int primary key auto_increment,
    firstName varchar(255),
    lastName varchar(255),
    username varchar(255),
    password varchar(255),
    role varchar(255),
    loggedIn bool default false
);

--add cascades where relevent