export class Message {
  text: string;
  time: Date;
  user: string;
  group: string;

  constructor(
    text: string,
    time: Date,
    user: string,
    group: string) {
      this.text = text;
      this.time = time;
      this.user = user;
      this.group = group;
    }
}
