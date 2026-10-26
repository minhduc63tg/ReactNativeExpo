import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import bookService from "../../src/services/bookService";
import reviewService from "../../src/services/reviewService";
import { Book, Review } from "../../src/types";
import { useAuth } from "../../src/context/AuthContext";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bookId = Number(id);
  const router = useRouter();
  const { user, logout } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho Form Review
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [b, r] = await Promise.all([
          bookService.getById(bookId),
          reviewService.getByBook(bookId),
        ]);
        if (cancelled) return;
        setBook(b);
        setReviews(r);

        bookService
          .getRelated(b)
          .then((res) => !cancelled && setRelated(res))
          .catch(() => {});
      } catch (err) {
        Alert.alert("Lỗi", "Không thể tải thông tin sách");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const handlePostReview = async () => {
    if (!user) return;
    if (!comment.trim()) {
      Alert.alert("Lưu ý", "Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setSubmitting(true);
      const created = await reviewService.create({
        bookId,
        userId: user.id,
        userName: user.name,
        rating: Number(rating),
        comment: comment.trim(),
      });
      // Chèn vào đầu mảng cục bộ
      setReviews((prev) => [created, ...prev]);
      setComment("");
      Alert.alert("Thành công", "Đã đăng đánh giá!");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        Alert.alert(
          "Hết phiên",
          "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
        );
        await logout();
      } else {
        Alert.alert("Lỗi", err.message || "Không thể tạo đánh giá");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingChange = (text: string) => {
    // Cho phép xóa rỗng để gõ lại, hoặc chỉ nhận đúng 1 chữ số từ 1 đến 5
    if (text === "" || /^[1-5]$/.test(text)) {
      setRating(text);
    }
  };

  if (loading || !book) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#1565c0" />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: book.image }} style={styles.cover} />
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.category}>{book.category}</Text>
          <Text style={styles.price}>
            {book.price.toLocaleString("vi-VN")} đ
          </Text>
        </View>
      </View>

      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.divider} />

      {/* Đánh giá */}
      <Text style={styles.heading}>Đánh giá & Bình luận</Text>
      <Text style={styles.ratingOverview}>
        Điểm TB: {avgRating} ★ ({reviews.length} đánh giá)
      </Text>

      {user ? (
        <View style={styles.reviewBox}>
          <Text style={styles.label}>Viết đánh giá của bạn (1 - 5 sao):</Text>
          <TextInput
            style={styles.inputRating}
            keyboardType="number-pad"
            maxLength={1}
            value={rating}
            onChangeText={handleRatingChange}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Cảm nhận về cuốn sách..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handlePostReview}
            disabled={submitting}
          >
            <Text style={styles.btnText}>
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginBanner}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginBannerText}>Đăng nhập để viết đánh giá</Text>
        </TouchableOpacity>
      )}

      {/* Danh sách bình luận */}
      {reviews.map((r) => (
        <View key={r.id} style={styles.reviewItem}>
          <View style={styles.reviewUser}>
            <Text style={styles.rName}>{r.userName}</Text>
            <Text style={styles.rStars}>{r.rating} ★</Text>
          </View>
          <Text style={styles.rComment}>{r.comment}</Text>
        </View>
      ))}

      {/* Sách liên quan */}
      {related.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <Text style={styles.heading}>Sách cùng thể loại</Text>
          {related.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedCard}
              onPress={() => router.push(`/book/${item.id}`)}
            >
              <Text style={styles.relatedTitle}>• {item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  topRow: { flexDirection: "row", gap: 14 },
  cover: { width: 110, height: 160, borderRadius: 8, backgroundColor: "#eee" },
  bookInfo: { flex: 1, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { color: "#555", marginVertical: 4 },
  category: { color: "#1565c0", fontWeight: "500" },
  price: { fontSize: 16, color: "#c62828", fontWeight: "bold", marginTop: 8 },
  desc: { marginTop: 12, lineHeight: 22, color: "#444" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  heading: { fontSize: 17, fontWeight: "bold", marginBottom: 8 },
  ratingOverview: { color: "#666", marginBottom: 14 },
  reviewBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: { fontSize: 13, color: "#555", marginBottom: 6 },
  inputRating: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    width: 45,
    padding: 6,
    borderRadius: 4,
    textAlign: "center",
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    minHeight: 60,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#1565c0",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  loginBanner: {
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  loginBannerText: { color: "#1565c0", fontWeight: "bold" },
  reviewItem: {
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 10,
  },
  reviewUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  rName: { fontWeight: "600", color: "#333" },
  rStars: { color: "#f57c00", fontWeight: "bold" },
  rComment: { color: "#555" },
  relatedCard: { paddingVertical: 6 },
  relatedTitle: { color: "#1565c0", fontSize: 14 },
});
