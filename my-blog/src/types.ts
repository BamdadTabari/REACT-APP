export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category?: string;
  image?: string; // ← تصویر base64
}
