-- This query will delete an item from a users cart
delete from cart_items
where cart_item_id = $1;