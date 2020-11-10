import handlebars from "express-handlebars";

export const handlebarsEngine = handlebars.create({
    layoutsDir: __dirname + "/../../views/layouts",
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        times(n: number, block: { fn: (arg0: number) => string; }) {
            let accum = '';
            for(let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        },
        bool_check(b:string,  block: { fn: (arg0: any) => any; inverse: (arg0: any) => any; }){
            if(b == null || b === "true"){
                return block.fn(this);
            }else{
                return block.inverse(this);
            }
        },
        toggle_direction(b: string){
            if(b == null || b === "1"){
                return "-1";
            }else{
                return "1";
            }
        },
        checkedIfEqual (val1: any, val2: any) {
            if (val1.toString() === val2.toString()) {
                return "checked";
            } else {
                return "";
            }
        },
        toggle_boolean(b: string){
            if(b == null || b === "true"){
                return "false";
            }else{
                return "true";
            }
        }
    },
})
