export class Message {
  text: string;
  time: number;
  user: string;
  chat: string;
  hour: number;
  minute: number;
  month: number;
  year: number;
  date: number;

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
      this.date = new Date(time).getDate();
      this.month = new Date(time).getMonth();
      this.year = new Date(time).getFullYear();
    }
}
