//To view an in depth explanation of authentication, view the authentication lecture video and lecture notes. Below are comments regarding the changes to authentication when working with a user cart(changes are found in the register function).
const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');

        let foundUser = await db.customer.check_customer(email);
        if(foundUser[0]){
            return res.status(400).send('Email is already in use')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.customer.register_customer(email, hash);

        //When working with a user cart, the cart should be included as part of the users session. A user will need an active cart as soon as they create an account. To do this, create the cart with the customer_id that is found in the newUser variable. Then create a new object that contains both the customer information and the cart information.
        let customerCart = await db.cart.create_cart(newUser[0].customer_id);
        let sessionCustomer = {...newUser[0], ...customerCart[0]};

        req.session.user = sessionCustomer;
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        //login doesn't change on the handler function due to the SQL query for getting user information grabbing both the users information as well as their active cart information.
        const {email, password} = req.body,
              db = req.app.get('db');

        let foundUser = await db.customer.check_customer(email);
        if(!foundUser[0]){
            return res.status(400).send('User not found')
        }

        const authorized = bcrypt.compareSync(password, foundUser[0].password);
        if(!authorized){
            return res.status(401).send('Incorrect password')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}