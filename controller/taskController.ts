import { taskDatabase } from "../domain/TaskDatabase";
import Task from "../domain/Task";

export class TaskController {
  async getIndex(req: any, res: any): Promise<void> {
    const tasks = await taskDatabase.getAllTasks(
      req.userSettings.orderBy,
      req.userSettings.orderDescending,
      req.userSettings.hideDone
    );
    console.log(`Rendering with Theme: ${req.userSettings.theme}`);
    res.render("index", {
      tasks,
      theme: req.userSettings.theme,
      orderDescending: req.userSettings.orderDescending,
      orderBy: req.userSettings.orderBy,
      hideDone: req.userSettings.hideDone,
    });
  }
  async getTask(req: any, res: any) {
    let task: Task;
    const id = req.params.id;
    if (id == null || id === "") {
      task = new Task("", "", null, null, 0, false);
    } else {
      task = await taskDatabase.getTask(id);
    }
    res.render("task", { task, theme: req.userSettings.theme });
  }
  async postTask(req: any, res: any) {
    const task = new Task(
      req.body.title,
      req.body.content,
      new Date(),
      new Date(req.body.due),
      req.body.priority,
      req.body.done === "on"
    );
    const id = req.params.id;
    if (id == null || id === "") {
      await taskDatabase.addTask(task);
    } else {
      task.created = req.body.created;
      await taskDatabase.updateTask(id, task);
    }
    res.redirect("/");
  }
}

export const taskController = new TaskController();
