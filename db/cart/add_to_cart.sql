--This query adds a product to a users cart by inserting the cart_id and product information
insert into cart_items (
    cart_id,
    product_id,
    qty,
    price
) values (
    $1,
    $2,
    1,
    $3
);