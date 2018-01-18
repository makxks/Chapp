export class Message {
  text: string;
  time: number;
  user: string;
  groupname: string;
  hour: number,
  minute: number

  constructor(
    text: string,
    time: number,
    user: string,
    groupname: string) {
      this.text = text;
      this.time = time;
      this.user = user;
      this.groupname = groupname;
      this.hour = new Date(time).getHours();
      this.minute = new Date(time).getMinutes();
    }
}
