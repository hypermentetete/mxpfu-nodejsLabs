const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  let sortedUsers = users.sort(function(a,b) {
    return (a.lastName < b.lastName ? -1 : (a.lastName === b.lastName ? 0 : 1));
  });
  res.send(JSON.stringify({sortedUsers}, null, 4));
  //res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  res.send(users.filter((user) => user.email === req.params.email));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/lastName/:lastName",(req,res)=>{
    // Copy the code here
    res.send(users.filter((user) => user.lastName === req.params.lastName));
  });

// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  users.push ({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  res.send("User " + req.query.firstName + " created")//This line is to be replaced with actual return value
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === req.params.email);

  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    
    let DOB = req.query.DOB;
    if (DOB) {
        filtered_user.DOB = DOB;
    }

    let firstName = req.query.firstName;
    if (firstName) {
        filtered_user.firstName = firstName;
    }

    users = users.filter((user) => user.email != email);
    users.push(filtered_user); 

    res.send(`User ${email} updated.`);
  } else {
    res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === req.params.email);

  if (filtered_users.length > 0) {
    users = users.filter((user) => user.email != email);
    res.send(`User ${email} deleted.`);
  } else {
    res.send("Unable to find user!");
  }
});

module.exports=router;
