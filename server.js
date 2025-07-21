import express, { urlencoded } from "express";
import User from "./models/User.js";
import connectDB from "./db.js";
import session from "express-session";
import router from "./routes/authRoutes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(urlencoded({extended: true}))

app.use(session({
    secret: 'supersecretkey',
    resave:true,
    saveUninitialized: true,
    cookie:{secure:false}
}))

app.use('/api/auth', router);

app.listen(3000, () => {
    console.log("Server running on 3000")
})