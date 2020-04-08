-- This query will grab all the product information for the products in a users cart. This is done by joining the cart_items table with the products table.
select * from cart_items ci
join products p on ci.product_id = p.product_id
where ci.cart_id = $1;