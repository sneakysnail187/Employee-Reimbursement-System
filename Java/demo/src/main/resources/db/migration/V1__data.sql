drop table if exists users;
drop table if exists reimbursement;
create table users (
    userId serial primary key,
    firstName varchar(255),
    lastName varchar(255),
    username varchar(255),
    password varchar(255),
    role varchar(255)
);

create table reimbursement (
    reimbursementId serial primary key,
    description varchar(255),
    amount decimal(8,2),
    status varchar(255) not null,
    userId int not null,
    foreign key (userId) references users(userId)
);

--add cascades where relevent
--add seperate table for roles

--insert into users values (9999, 'Hello', 'World', 'username1', 'password', 'Employee', false);
--insert into users values (9998, 'Hello', 'World', 'username2', 'password', 'Employee', false);
--insert into users values (9997, 'Hello', 'World', 'username3', 'password', 'Employee', false);
--insert into users values (9996, 'Hello', 'World', 'username4', 'password', 'Employee', false);


--insert into reimbursement values (9999, 'test reimbursement 1', 500.00, 'Pending', 9999);
--insert into reimbursement values (9998, 'test reimbursement 2', 500.00, 'Pending', 9998);
--insert into reimbursement values (9997, 'test reimbursement 3', 500.00, 'Pending', 9997);
--insert into reimbursement values (9996, 'test reimbursement 4', 500.00, 'Pending', 9996);