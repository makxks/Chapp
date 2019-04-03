export class Message {
  text: string;
  time: number;
  user: string;
  chat: string;
  hour: number;
  minute: number;

  constructor(
    text: string,
    time: number,
    user: string,
    chat: string) {
      this.text = text;
      this.time = time;
      this.user = user;
      this.chat = chat;
      this.hour = new Date(time).getHours();
      this.minute = new Date(time).getMinutes();
    }
}
