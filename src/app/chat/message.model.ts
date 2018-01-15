export class Message {
  text: string;
  time: number;
  user: string;
  groupname: string;

  constructor(
    text: string,
    time: number,
    user: string,
    groupname: string) {
      this.text = text;
      this.time = time;
      this.user = user;
      this.groupname = groupname;
    }
}
