-- This is used in two areas:
-- 1. Creating a new cart for a newly registered user(found in the register function in authCtrl).
-- 2. Creating a new cart after a user completes a purchase(found in the completePurchase function in the mainCtrl).
insert into customer_cart (
    customer_id,
    paid
) values (
    $1,
    false
)
returning cart_id, paid;