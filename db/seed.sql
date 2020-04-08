-- The schema for a shopping cart on an e-commerce site should contain:
-- 1. A customer table
-- 2. A product table
-- 3. A cart table, which will contain the customer_id as well as paid. Paid is how you will determine an active cart from an inactive one.
-- 4. A cart-items table. This should contain the cart_id as well as the product_id.
create table customers (
    customer_id serial primary key,
    email varchar(150) not null,
    password varchar(250) not null
);

create table products (
    product_id serial primary key,
    name varchar(50) not null,
    image varchar(250) not null,
    description text,
    price decimal not null
);

create table customer_cart (
    cart_id serial primary key,
    customer_id int references customers(customer_id),
    paid boolean
);

create table cart_items (
    cart_item_id serial primary key,
    cart_id int references customer_cart(cart_id),
    product_id int references products(product_id),
    qty int,
    price decimal
);