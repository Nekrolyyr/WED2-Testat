import express from 'express'
import morgan from 'morgan'
import path from 'path'
import handlebars from 'express-handlebars'
import Task from "./Task";

const app = express();
const port = 8080;

app.use(morgan('combined'))
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "hbs")
app.use(express.static('public'))
const handlebarsEngine = handlebars({
    layoutsDir: __dirname + "/../views/layouts",
    defaultLayout: "main",
    extname: "hbs",
    helpers: {times(n: number, block: { fn: (arg0: number) => string; }) {
            let accum = '';
            for(let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        }}
})
app.engine("hbs", handlebarsEngine)

const tasks = [
    new Task("Task 1", "Hello World Lorem Ipsum dolores isa novum terestane go los bartena salva ...... ...... ----- ---- Go", new Date(), new Date(), 3, false),
    new Task("Task 2 long title", "Hello World 3", new Date(), new Date(), 1, true),
]

app.get("/", (req,res) => {
    res.render("index", {tasks, theme: "theme-light"})
})

app.listen(port, ()=>{
    console.log("Server Started!")
})
