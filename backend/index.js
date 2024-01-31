const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const registerdb = require('./model');
const PORT = 8000;
const SECRET_KEY = '6Ldm110lAAAAAIewd7mhg1_5QmTCGjwl0XCiazA1';


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/assignment', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful'))
    .catch((err) => console.log('DB connection failed', err));



app.post('/user/register', async (req, res) => {
    try {
        const { recaptchaValue } = req.body;
        const registerdata = await registerdb.create(req.body);
                  res.status(200).json({
                        status: 'success',
                       data: {
                            registerdata
                  }
                   })

        // axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaValue}`)
        //     .then(async ({ data }) => {

        //         if (data.success) {
        //             const registerdata = await registerdb.create(req.body);
        //             res.status(200).json({
        //                 status: 'success',
        //                 data: {
        //                     registerdata
        //                 }
        //             })
        //         }
        //         else {
        //             console.log("cannot register")
        //             return res.status(400).json({ error: "Invalid captcha" });
        //         }
        //     })

    } catch (er) {
        res.status(400).json({
            status: 'failed',
            error: er
        })
    }
});

app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            status: "failed",
            message: "Empty Field values"
        })
    }

    const checkuser = await registerdb.findOne({ email });

    if (!checkuser || !(await checkuser.checkcorrectPass(password, checkuser.password))) return res.status(400).json({
        status: 'failed',
        message: 'Invalid Email or Password'
    });

    else {
        res.status(200).json({
            status: 'success',
            message: checkuser
        })

    }

})

app.listen(PORT, function () {
    console.log(`App is running on ${PORT}`);
})

