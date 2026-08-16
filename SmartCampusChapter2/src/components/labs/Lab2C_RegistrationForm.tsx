import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

interface FormValues {
  fullName: string;
  studentId: string;
  email: string;
  program: string;
  bio: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function Lab2C_RegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    studentId: "",
    email: "",
    program: "",
    bio: "",
  });

  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  // Refs để chuyển tiếp focus mượt mà qua các ô
  const studentIdRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const programRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);

  // Hàm Validation theo đúng chuẩn quy tắc của Lab 2C
  const validate = (form: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!form.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ và tên.";
    }
    if (!/^SC-\d{4}-\d{4}$/.test(form.studentId.trim())) {
      errors.studentId = "Mã sinh viên phải có định dạng SC-YYYY-NNNN.";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Vui lòng nhập đúng định dạng email sinh viên.";
    }
    if (!form.program.trim()) {
      errors.program = "Vui lòng nhập chuyên ngành đào tạo.";
    }
    if (form.bio.length > 240) {
      errors.bio = "Tiểu sử không được vượt quá 240 ký tự.";
    }
    return errors;
  };

  const errors = validate(values);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const shouldShowError = (field: keyof FormValues) => {
    return (submitted || touched[field]) && errors[field];
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      Alert.alert("Thành công", "Đã ghi nhận thông tin đăng ký sinh viên!", [
        {
          text: "OK",
          onPress: () => {
            setValues({
              fullName: "",
              studentId: "",
              email: "",
              program: "",
              bio: "",
            });
            setTouched({});
            setSubmitted(false);
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text accessibilityRole="header" style={styles.formTitle}>
            Hồ sơ sinh viên
          </Text>

          {/* Trường 1: Full Name */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput
              value={values.fullName}
              onChangeText={(val) => updateField("fullName", val)}
              onBlur={() => handleBlur("fullName")}
              placeholder="Nguyễn Văn A"
              returnKeyType="next"
              onSubmitEditing={() => studentIdRef.current?.focus()}
              style={[
                styles.input,
                shouldShowError("fullName") && styles.inputError,
              ]}
            />
            {shouldShowError("fullName") && (
              <Text style={styles.errorText}>⚠️ {errors.fullName}</Text>
            )}
          </View>

          {/* Trường 2: Student ID */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Mã sinh viên (SC-YYYY-NNNN) *</Text>
            <TextInput
              ref={studentIdRef}
              value={values.studentId}
              onChangeText={(val) =>
                updateField("studentId", val.toUpperCase())
              }
              onBlur={() => handleBlur("studentId")}
              placeholder="SC-2026-1234"
              autoCapitalize="characters"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              style={[
                styles.input,
                shouldShowError("studentId") && styles.inputError,
              ]}
            />
            {shouldShowError("studentId") && (
              <Text style={styles.errorText}>⚠️ {errors.studentId}</Text>
            )}
          </View>

          {/* Trường 3: Institutional Email */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Email trường cấp *</Text>
            <TextInput
              ref={emailRef}
              value={values.email}
              onChangeText={(val) => updateField("email", val.toLowerCase())}
              onBlur={() => handleBlur("email")}
              placeholder="sinhvien@campus.edu.vn"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => programRef.current?.focus()}
              style={[
                styles.input,
                shouldShowError("email") && styles.inputError,
              ]}
            />
            {shouldShowError("email") && (
              <Text style={styles.errorText}>⚠️ {errors.email}</Text>
            )}
          </View>

          {/* Trường 4: Program */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Chương trình đào tạo *</Text>
            <TextInput
              ref={programRef}
              value={values.program}
              onChangeText={(val) => updateField("program", val)}
              onBlur={() => handleBlur("program")}
              placeholder="Công nghệ phần mềm"
              returnKeyType="next"
              onSubmitEditing={() => bioRef.current?.focus()}
              style={[
                styles.input,
                shouldShowError("program") && styles.inputError,
              ]}
            />
            {shouldShowError("program") && (
              <Text style={styles.errorText}>⚠️ {errors.program}</Text>
            )}
          </View>

          {/* Trường 5: Bio (Multiline) */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Tiểu sử ngắn</Text>
              <Text
                style={[
                  styles.counter,
                  values.bio.length > 240 && styles.counterError,
                ]}
              >
                {values.bio.length}/240
              </Text>
            </View>
            <TextInput
              ref={bioRef}
              value={values.bio}
              onChangeText={(val) => updateField("bio", val)}
              onBlur={() => handleBlur("bio")}
              placeholder="Giới thiệu về mục tiêu, sở thích học tập..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[
                styles.input,
                styles.textArea,
                shouldShowError("bio") && styles.inputError,
              ]}
            />
            {shouldShowError("bio") && (
              <Text style={styles.errorText}>⚠️ {errors.bio}</Text>
            )}
          </View>

          {/* Submit Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Đăng ký hồ sơ sinh viên"
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitButtonText}>Xác nhận đăng ký</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  keyboardView: { flex: 1 },
  scrollContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
  },
  fieldWrapper: { gap: 6 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  counter: { fontSize: 12, color: theme.colors.textSecondary },
  counterError: { color: theme.colors.error, fontWeight: "bold" },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: { borderColor: theme.colors.error, backgroundColor: "#fff8f8" },
  textArea: { minHeight: 96, paddingTop: theme.spacing.sm },
  errorText: { fontSize: 12, color: theme.colors.error },
  submitButton: {
    minHeight: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  submitButtonPressed: { opacity: 0.85 },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
