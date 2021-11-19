import express from "express";
import cors from "cors"

import morgan from "morgan";
import mongoose from "mongoose";
const app = express();

const DB = process.env.DBURI

mongoose.connect(DB);
const CrudUser = mongoose.model('CrudUser', {
    userName: String,
    email: String,
    address: String,
});




app.use(cors('short'));
app.use(express.json());
app.use(morgan());


const port = process.env.PORT || 3000;



app.use((req, res, next) => {
    console.log(req.body)
    next();
})

app.get("/users", (req, res) => {
    CrudUser.find({}, (err, data) => {
        if (!err) {

            res.send(data)
        }
        else {
            res.status(500).send("Error Excuted")
        }
    })
})

app.get('/user/:id', (req, res) => {
    CrudUser.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            res.send(data)

        }
        else {
            res.status(505).send("Invalid Data")
        }
    })

})
app.post('/user', (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.address) {
        res.status(400).send("invalid data");
    } else {
        const newUser = new CrudUser({
            userName: req.body.userName,
            email: req.body.email,
            address: req.body.address,
        });
        newUser.save().then(() => {
            console.log('user created success')
            res.send({message:"users created"});
        })

    }
})

app.put('/user/:id', (req, res) => {
    let updateObj = {}
    if (req.body.userName) {
      
        updateObj.userName = req.body.userName
        }
        if (req.body.email) {
            updateObj.email = req.body.email
        }
        if (req.body.address) {
            updateObj.address = req.body.address
        }
        CrudUser.findByIdAndUpdate(req.params.id,updateObj, { new: true },
            (err, data) => {
                if (!err) {
                    res.send(data)
                } else {
                    res.status(500).send("error happened")
                }
            })
   
})


app.delete('/user/:id', (req, res) => {

    CrudUser.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.send("user deleted")
        } else {
            res.status(500).send("error exicuted")
        }
    })

})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
