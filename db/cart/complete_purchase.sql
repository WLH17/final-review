--This query sets a users cart to inactive after a purchase.
update customer_cart
set paid = true
where customer_id = $1
and paid = false;