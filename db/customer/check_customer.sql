-- This will select all of the customers information and the customers cart information
select * from customers c
join customer_cart cc on c.customer_id = cc.customer_id
where c.email = $1
and cc.paid = false;