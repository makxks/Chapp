export class Todo {
  name: string;
  description: string;
  user: string;
  deadline: string;
  group: string;

  constructor(
    name: string,
    description: string,
    user: string,
    deadline: string,
    group: string
  ){
    this.name = name;
    this.description = description;
    this.user = user;
    this.deadline = deadline;
    this.group = group;
  }
}
