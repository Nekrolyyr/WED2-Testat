import Datastore from "nedb-promises";
import Task from "./Task";

export class TaskDatabase{
    store: Datastore;
    constructor(store?: Datastore) {
        this.store =
            store ||
            new Datastore({
                filename: "./bdfiles/taskDatabase.db",
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
                    description: task.content,
                    priority: task.priority,
                    due: task.due,
                    created :task.created,
                    done: task.done,
                },
            }
        );
        return await this.getTask(id);
    }
    async getAllTasks(orderBy: string, orderDescending: boolean, hideDone: boolean) {
        let order;
        const filter = hideDone ? {} : {done: false};
        const directionNumber = orderDescending ? -1 : 1;
        switch (orderBy) {
            case "priority":
                order = { priority: directionNumber };
                break;
            case "created":
                order = { created: directionNumber };
                break;
            default:
            case "due":
                order = { due: directionNumber };
                break;
        }
        return this.store.find(filter).sort(order);
    }
}

export const taskDatabase = new TaskDatabase();
