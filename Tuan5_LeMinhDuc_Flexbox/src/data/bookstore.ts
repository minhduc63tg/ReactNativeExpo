export interface Book {
  id: string;
  title: string;
  author: string;
  originalPrice: number;
  price: number;
  discountBadge?: string; // Ví dụ: '-20%', '-15%', 'Mới'
  rating: number;
  reviewsCount: number;
  category: string;
  coverUrl: string;
  description: string;
}

export interface CartItem {
  id: string;
  book: Book;
  quantity: number;
}

export const CATEGORIES: string[] = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
  'Công nghệ',
  'Tâm lý học',
];

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm - Bí quyết để thành công trong cuộc sống và sự nghiệp',
    author: 'Dale Carnegie',
    originalPrice: 120000,
    price: 96000,
    discountBadge: '-20%',
    rating: 4.9,
    reviewsCount: 1420,
    category: 'Kỹ năng sống',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    description:
      'Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng lớn nhất của mọi thời đại. Cuốn sách đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia. Đây là cuốn sách đầu tiên và hay nhất về nghệ thuật giao tiếp, ứng xử và thu phục lòng người.\n\nTác phẩm đưa ra những lời khuyên sâu sắc về cách đối nhân xử thế, làm sao để tạo thiện cảm, thuyết phục người khác và xây dựng các mối quan hệ lâu dài, bền vững trong cuộc sống lẫn công việc.',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim (The Alchemist)',
    author: 'Paulo Coelho',
    originalPrice: 105000,
    price: 84000,
    discountBadge: '-20%',
    rating: 4.8,
    reviewsCount: 980,
    category: 'Văn học',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    description:
      'Nhà Giả Kim theo chân cậu bé chăn cừu Santiago trong hành trình từ quê hương Tây Ban Nha sang Kim tự tháp Ai Cập để tìm kiếm kho báu trong giấc mơ.\n\nTrên chuyến hành trình phiêu lưu đó, cậu học được cách lắng nghe tiếng nói con tim, thấu hiểu dấu hiệu của vũ trụ và vượt qua nỗi sợ hãi để sống trọn vẹn với "Vận mệnh của đời mình". Một tác phẩm rung động lòng người với thông điệp: Khi bạn thực sự khao khát một điều gì, cả vũ trụ sẽ hợp lực giúp bạn đạt được điều đó.',
  },
  {
    id: '3',
    title: 'Tư Duy Nhanh Và Chậm (Thinking, Fast and Slow)',
    author: 'Daniel Kahneman',
    originalPrice: 250000,
    price: 200000,
    discountBadge: '-20%',
    rating: 4.7,
    reviewsCount: 650,
    category: 'Kinh tế',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    description:
      'Tác phẩm của nhà tâm lý học từng đoạt giải Nobel Kinh tế Daniel Kahneman giải thích hai hệ thống tư duy chi phối cách con người đưa ra quyết định: Hệ thống 1 (nhanh, trực giác, cảm xúc) và Hệ thống 2 (chậm, lý tính, logic).\n\nCuốn sách phơi bày những điểm mù nhận thức và thiên kiến vô thức thường khiến chúng ta đưa ra những quyết định sai lầm trong kinh doanh, đầu tư và đời sống thường nhật.',
  },
  {
    id: '4',
    title: 'Hoàng Tử Bé (Le Petit Prince)',
    author: 'Antoine de Saint-Exupéry',
    originalPrice: 75000,
    price: 60000,
    discountBadge: '-20%',
    rating: 4.9,
    reviewsCount: 1890,
    category: 'Thiếu nhi',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    description:
      'Hoàng Tử Bé là một câu chuyện ngụ ngôn thi vị và đầy chất thơ về tình bạn, tình yêu và ý nghĩa đích thực của sự tồn tại. Chuyến du hành từ tiểu tinh cầu B612 đến Trái Đất của cậu bé tóc vàng mang lại cho người lớn những bài học tinh tế mà họ thường quên lãng: "Người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim; điều cốt lõi thì vô hình trước mắt trần."',
  },
  {
    id: '5',
    title: 'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ',
    author: 'James Clear',
    originalPrice: 189000,
    price: 189000,
    discountBadge: 'Mới',
    rating: 4.9,
    reviewsCount: 2310,
    category: 'Kỹ năng sống',
    coverUrl: 'https://img.freepik.com/free-vector/business-concept-illustration_52683-24949.jpg?t=st=1758427385~exp=1758430985~hm=a03d83297ef5d960d074fc245d53223211855af5443d2a443a46f0b4abf92621&w=740',
    description:
      'Không quan trọng mục tiêu của bạn lớn đến đâu, hệ thống bạn thiết lập hàng ngày mới là yếu tố quyết định thành bại. James Clear hướng dẫn quy trình 4 bước khoa học: Khiến nó trở nên rõ ràng, hấp dẫn, dễ dàng và thỏa mãn.\n\nChỉ cần cải thiện 1% mỗi ngày, sau một năm bạn sẽ tiến bộ gấp 37 lần. Một cẩm nang thực hành tuyệt vời cho bất kỳ ai muốn nâng cao năng suất cá nhân.',
  },
  {
    id: '6',
    title: 'Sapiens - Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    originalPrice: 220000,
    price: 187000,
    discountBadge: '-15%',
    rating: 4.8,
    reviewsCount: 1120,
    category: 'Lịch sử',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
    description:
      'Sapiens dẫn dắt người đọc qua toàn bộ chiều dài lịch sử của loài người từ những sinh vật vượn người sơ khai đến khi thống trị hành tinh xanh.\n\nBằng lối hành văn lôi cuốn và lập luận sắc bén, Harari chỉ ra cách mà khả năng tin vào những câu chuyện hư cấu (tôn giáo, tiền bạc, quốc gia) đã giúp hàng triệu con người hợp tác cùng nhau tạo nên nền văn minh hiện đại.',
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    id: 'c1',
    book: BOOKS[0], // Đắc Nhân Tâm
    quantity: 1,
  },
  {
    id: 'c2',
    book: BOOKS[1], // Nhà Giả Kim
    quantity: 2,
  },
  {
    id: 'c3',
    book: BOOKS[3], // Hoàng Tử Bé
    quantity: 1,
  },
];

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}
