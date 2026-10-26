import { api } from "../api/client";
import { Book } from "../types";

async function getAll(): Promise<Book[]> {
  const res = await api.get<Book[]>("/books");
  return res.data;
}

async function getById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}

async function getRelated(book: Book, limit = 5): Promise<Book[]> {
  const res = await api.get<Book[]>("/books", {
    params: { category: book.category, id_ne: book.id, _limit: limit },
  });
  return res.data;
}

export default { getAll, getById, getRelated };
