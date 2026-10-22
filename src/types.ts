export interface WishMessage {
  id: string;
  sender: string;
  relation: string;
  message: string;
  likes: number;
  date: string;
  tag?: string;
  avatarColor: string;
}

export interface FortuneSlice {
  id: number;
  title: string;
  blessing: string;
  icon: string;
  color: string;
}

export interface Compliment {
  id: number;
  text: string;
  emoji: string;
}
