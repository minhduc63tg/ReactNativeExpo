import React, { createContext, useContext, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

// 1. Khởi tạo Context
interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

// 2. Component con ProfileScreen nhận context
function ProfileScreen() {
  const context = useContext(UserContext);

  if (!context || !context.user) {
    return (
      <View style={styles.profileBox}>
        <Text style={styles.infoText}>Bạn chưa đăng nhập</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileBox}>
      {/* Giả lập Avatar bằng hình tròn */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{context.user.name.charAt(0)}</Text>
      </View>
      <Text style={styles.infoText}>Xin chào, {context.user.name}</Text>
      <Text style={styles.subInfo}>Email: {context.user.email}</Text>

      <View style={{ marginTop: 12 }}>
        <Button title="Đăng xuất" color="#ff3b30" onPress={context.logout} />
      </View>
    </View>
  );
}

// 3. Component Cha cung cấp Provider
export default function Bai3Screen() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
  });

  const logout = () => {
    setCurrentUser(null);
  };

  const login = () => {
    setCurrentUser({
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
    });
  };

  return (
    <UserContext.Provider value={{ user: currentUser, logout }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Bài 3.1.3: useContext</Text>
        <ProfileScreen />

        {!currentUser && (
          <View style={{ marginTop: 16 }}>
            <Button title="Đăng nhập lại" onPress={login} />
          </View>
        )}
      </SafeAreaView>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  profileBox: { alignItems: "center", width: "100%" },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  infoText: { fontSize: 18, fontWeight: "600" },
  subInfo: { fontSize: 14, color: "#666", marginTop: 4 },
});
