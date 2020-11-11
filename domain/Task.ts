export default class Task {
  title: string;
  content: string;
  created: Date;
  due: Date;
  priority: number;
  done: boolean;
  dueText: string;
  dueISO: string;
  constructor(
    title: string,
    content: string,
    created: Date,
    due: Date,
    priority: number,
    done: boolean
  ) {
    this.title = title;
    this.content = content;
    this.created = created;
    this.due = due;
    this.priority = priority;
    this.done = done;
    this.dueText = due?.toDateString();
    this.dueISO = due?.toISOString().substring(0, 10);
  }
}
