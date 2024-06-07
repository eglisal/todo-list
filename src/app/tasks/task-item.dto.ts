export class TaskItem {
  public isDone = false;

  constructor(public title: string, public date: Date) {}

  toggleIsDone() {
    this.isDone = !this.isDone;
  }
}
