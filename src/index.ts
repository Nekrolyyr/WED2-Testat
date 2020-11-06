import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import path from 'path';
import {handlebarsEngine} from "../domain/handlebarBuilder";
import taskRouter from "../router/taskRouter"
import {sessionHandler} from "../domain/Session";
import session from "express-session";
import override from "method-override";


const app = express();
const port = 8080;

app.use(morgan('combined'))
app.set("views", path.join(__dirname, "../../views"))
app.use(express.static('public'))
app.engine("hbs", handlebarsEngine.engine)
app.set("view engine", "hbs")

app.use(
    session({
        secret: "099093288389249824879283",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(sessionHandler)
app.use(taskRouter)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(override((req: { body: { _method: any; }; }, res: any) =>{
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.listen(port, ()=>{
    console.log("Server Started!")
})
