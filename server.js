const express = require("express");

//data
const { users } = require("./data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

// Connecting Routes
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const e = require("express");

app.get("/", (req, res) => {
    res.status(200).send("Server running successfully");
})


// GET Method
/*
1.
Route- /users
description- get all users
method- get
access- public
parameters- none
*/

app.get("/users", (req,res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/*
2.
Route- /users/:id
description- get users by thier id
method- GET
access- public
parameters- Id
*/

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const isuser = users.find((each)=> each.id ===id);
    if (!isuser){
        return res.status(404).json({
            message : 'User not found',
            success : false, 
        });
    }
    else {
        return res.status(200).json({
            message : 'Congrats! User found',
            success : true,
            data : isuser,
        });
    }
})

app.get("*", (req, res) => {
    status(401).json({
        message: "Route doesn't exist"
    });
})

// POST Method
/*
3.
Route- /users
description- Create a new user
method- POST
access- public
parameters- none
*/
app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    // check whether user with same id exists
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(401).send('User already exist');
    }
    else {
        res.status(201).json({
            message : "User added",
            data : users,
            success : true,
        });
        users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate
        });
        
    }
})

.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})