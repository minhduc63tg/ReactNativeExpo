import React, { useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

interface FormState {
  email: string;
  password: string;
  error: string;
  isSubmitting: boolean;
}

type FormAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET" };

const initialState: FormState = {
  email: "",
  password: "",
  error: "",
  isSubmitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload, error: "" };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload, isSubmitting: false };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Bai4Screen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    // 1. Kiểm tra để trống
    if (!state.email.trim() || !state.password.trim()) {
      dispatch({
        type: "SET_ERROR",
        payload: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }
    // 2. Mở rộng: Kiểm tra email có @
    if (!state.email.includes("@")) {
      dispatch({
        type: "SET_ERROR",
        payload: "Email không hợp lệ (phải chứa ký tự @)",
      });
      return;
    }
    // 3. Mở rộng: Kiểm tra mật khẩu >= 6 ký tự
    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        payload: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return;
    }

    // 4. Mở rộng: Giả lập gửi form (isSubmitting)
    dispatch({ type: "SET_SUBMITTING", payload: true }); // Thêm payload:
    setTimeout(() => {
      dispatch({ type: "SET_SUBMITTING", payload: false }); // Thêm payload:
      alert("Đăng nhập thành công!");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bài 3.1.4: useReducer</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: "SET_PASSWORD", payload: text })
        }
      />

      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

      <View style={styles.buttonGroup}>
        {state.isSubmitting ? (
          <ActivityIndicator size="small" color="#007aff" />
        ) : (
          <Button title="Đăng nhập" onPress={handleLogin} />
        )}
        <Button
          title="Đặt lại"
          color="#ff3b30"
          onPress={() => dispatch({ type: "RESET" })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  error: { color: "red", marginBottom: 12, textAlign: "center" },
  buttonGroup: { gap: 10, marginTop: 8 },
});
