import Datastore from "nedb-promises";
import Task from "./Task";

export class TaskDatabase{
    store: Datastore;
    constructor(store?: Datastore) {
        this.store =
            store ||
            new Datastore({
                filename: "./dbfiles/taskDatabase.db",
                autoload: true,
            });
    }
    async getTask(id: string):Promise<Task> {
        return this.store.findOne({ _id: id });
    }
    async addTask(task: Task) {
        return await this.store.insert(task)
    }
    async updateTask(id: string, task: Task){
        await this.store.update(
            { _id: id },
            {
                $set: {
                    title: task.title,
                    content: task.content,
                    priority: task.priority,
                    due: task.due,
                    created :task.created,
                    done: task.done,
                },
            }
        );
        return await this.getTask(id);
    }
    async getAllTasks(orderBy: string, orderDescending: string, hideDone: string) {
        let order;
        const filter = hideDone!=null && hideDone==="true" ? {} : {done: false};
        switch (orderBy) {
            case "created":
                order = { created: orderDescending };
                break;
            case "priority":
                order = { priority: orderDescending };
                break;
            default:
            case "due":
                order = { due: orderDescending };
                break;
        }
        return this.store.find(filter).sort(order);
    }
}

export const taskDatabase = new TaskDatabase();
