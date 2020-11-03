"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const Task_1 = __importDefault(require("./Task"));
const app = express_1.default();
const port = 8080;
app.use(morgan_1.default('combined'));
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express_1.default.static('public'));
const handlebarsEngine = express_handlebars_1.default({
    layoutsDir: __dirname + "/../views/layouts",
    defaultLayout: "main",
    extname: "hbs",
    helpers: { times(n, block) {
            let accum = '';
            for (let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        } }
});
app.engine("hbs", handlebarsEngine);
const tasks = [
    new Task_1.default("Task 1", "Hello World Lorem Ipsum dolores isa novum terestane go los bartena salva ...... ...... ----- ---- Go", new Date(), new Date(), 3, false),
    new Task_1.default("Task 2 long title", "Hello World 3", new Date(), new Date(), 1, true),
];
app.get("/", (req, res) => {
    res.render("index", { tasks });
});
app.listen(port, () => {
    console.log("Server Started!");
});
//# sourceMappingURL=index.js.map