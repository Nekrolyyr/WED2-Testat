"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(title, content, created, due, priority, done) {
        this.title = title;
        this.content = content;
        this.created = created;
        this.due = due;
        this.priority = priority;
        this.done = done;
        this.dueText = due.toDateString();
    }
}
exports.default = Task;
//# sourceMappingURL=Task.js.map