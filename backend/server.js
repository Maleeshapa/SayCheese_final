//-------------------------------------------------------------db connection


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors({
    origin:["http://localhost:3000","https://mern-app.onrendr.com"],
}));
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'saycheesenew'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



//---------------------------------------------------------------booking

app.post('/Booking', (req, res) => {
    // Extract data from request body
    const { name, email, nic, type, date, message } = req.body;
    if (!name || !email || !nic || !type || !date || !message) {
        return res.status(400).json({ error: 'Fill required fields' });
    }

    // Insert booking details into 'bookingdetails' table
    const bookingSql = "INSERT INTO bookingdetails (Name, Email, Nic, Type, Date, Message) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(bookingSql, [name, email, nic, type, date, message], (bookingErr, bookingResult) => {
        if (bookingErr) {
            console.error('Error executing booking SQL query:', bookingErr);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Check if email or NIC already exists in 'users' table
        const userCheckSql = "SELECT * FROM users WHERE Email = ? OR Nic = ?";
        db.query(userCheckSql, [email, nic], (userCheckErr, userCheckResult) => {
            if (userCheckErr) {
                console.error('Error checking user SQL query:', userCheckErr);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (userCheckResult.length > 0) {
                // Email or NIC already exists, return an error response
                return res.status(400).json({ error: 'Email or NIC already exists' });
            }

            // Email and NIC do not exist, insert them into 'users' table
            const userInsertSql = "INSERT INTO users (Email, Nic) VALUES (?, ?)";
            db.query(userInsertSql, [email, nic], (userInsertErr, userInsertResult) => {
                if (userInsertErr) {
                    console.error('Error inserting user SQL query:', userInsertErr);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Return success response
                return res.json({ message: 'Booking added successfully', bookingResult });
            });
        });
    });
});


// ------------------------------------------------------- User Login--------------------------------------------

app.post('/Login', (req, res) => {
    
    const { email, nic } = req.body;
    const sql = "SELECT * FROM bookingdetails WHERE Email=? AND Nic=?";
    db.query(sql, [email, nic], (err, data) => {
        if (err) {
            console.error('Error executing admin SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length > 0) {
            return res.json({ message: "Logged In" });
        } else {
            return res.status(401).json({ message: "Login Failed" });
        }     
    });
});



// ------------------------------------------------------- Read by email--------------------------------------------

app.get('/view/:email', (req, res)=>{
    const sql = "SELECT id, Name,  Type, DATE_FORMAT(Date, '%Y-%m-%d') AS Date, Message, Download FROM bookingdetails WHERE Email=?";
    const email = req.params.email;

    db.query(sql,email,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})




// ------------------------------------------------------- Admin Login--------------------------------------------


app.post('/Admin', (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE Email=? AND Password=?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error('Error executing admin SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length > 0) {
            return res.json({ message: "Logged In" });
        } else {
            return res.status(401).json({ message: "Login Failed" });
        }
    });
});

//----------------------------------------------------Retrieve booking details to Dashboard

app.get('/bookingdetails', (req, res)=>{
    const sql = "SELECT id, Name, Email, Nic, Type, DATE_FORMAT(Date, '%Y-%m-%d') AS Date, Message, Download FROM bookingdetails";
    db.query(sql,(err,result) => {
        if(err) return res.status(500).json({ message: "Server error" });
        return res.json(result);
    });
});

//------------------------------------------------------ DELETE booking by ID 

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM bookingdetails WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Deleted Row(s):', result.affectedRows);
      return res.status(200).json({ message: 'Record deleted successfully' });
    });
});


//------------------------------------------------------- insert booking details

app.post('/bookingdetails', (req, res) => {
    const sql = "INSERT INTO bookingdetails (Name, Email,Nic,Type,Date,Message,Download) VALUES (?, ?,?,?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.nic,
        req.body.type,
        req.body.date,
        req.body.message,
        req.body.download,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err.message });
        }
        console.log("Record inserted successfully");
        return res.json({ success: true, result: result });
    });
});


// ----------------------------------------------------------------- user details show in dashboard

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql,(err,result) => {
        if(err) return res.status(500).json({ message: "Server error" });
        return res.json(result);
    });
});


//----------------------------------------------------------------------update download URL by dashboard

app.put('/update/:id', (req,res)=>{
    const sql = 'UPDATE bookingdetails set `Download`=? where Id=?';
    const values=[
        
        req.body.download
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err,data)=>{
        if(err) return res.json("error");
        return res.json(data);
})
})



//----------------------------------------------------------------- Route to handle sending email

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's92084072@ousl.lk',
        pass: '200021403688'
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, nic, type, date, message } = req.body;

    // Email content
    const mailOptions = {
        from: 'SayCheese Booking System',
        to: 'maleeshapathirana1@gmail.com', // Change this to your desired recipient email
        subject: `New Booking Alert - ${name}`,
        text: 
        `Name: ${name}
        \nEmail: ${email}
        \nContact Number: ${phone}
        \nNIC: ${nic}
        \nType: ${type}
        \nDate: ${date}
        \nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});


// -------------------------------------------gallery image---------------------------//

// app.get('/products', (req, res) => {
//     const query = 'SELECT Id, Price, Image FROM product';
  
//     dbConnection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error retrieving products:', error);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
  
//       // Map the retrieved data to match the format expected by the frontend
//       const products = results.map((product) => ({
//         id: product.Id,
//         price: product.Price,
//         productImage: product.Image,
//       }));
  
//       res.json(products);
//     });
//   });


app.get('/product', (req, res) => {
    const sql = "SELECT Id, Price, Image FROM product";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(result);
    });
});


// -------------------------------------product detail show--------------------------------


app.get('/ProductDetails', (req, res)=>{
    const sql = "SELECT * FROM product";
    db.query(sql,(err,result) => {
        if(err) return res.status(500).json({ message: "Server error" });
        return res.json(result);
    });
});

//------------------------------------------------------- insert product details

// Add a route to handle POST requests to add a new product
app.post('/product', (req, res) => {
    const { price, image } = req.body;
    const sql = "INSERT INTO product (Price, Image) VALUES (?, ?)";
    db.query(sql, [price, image], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
        console.log("Record inserted successfully");
        return res.json({ success: true, result: result });
    });
});

