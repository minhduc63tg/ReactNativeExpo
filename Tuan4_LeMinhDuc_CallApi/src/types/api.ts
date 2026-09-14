export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Address {
  street: string;
  city: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
}

// Cấu trúc CustomError cho Bài tập 12
export interface CustomError {
  message: string;
  statusCode: number;
}

// Hàm Generic cho Bài tập 13: Lọc danh sách bất kỳ có trường name
export function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string
): T[] {
  return items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

// Bài tập 14: Generic Interface cho Wrapper Response phân trang
export interface ApiResponse<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}
