import { api, getServerMessage } from "../api/client";
import { User } from "../types";

export interface AuthResult {
  token: string;
  user: User;
  expiresAt: number;
}

interface AuthResponse {
  accessToken: string;
  user: User & { password?: string };
}

function getJwtExpiry(token: string): number {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload.exp * 1000;
  } catch {
    return Date.now() + 60 * 60 * 1000;
  }
}

const MESSAGES: Record<string, string> = {
  "Cannot find user": "Email hoặc mật khẩu không đúng",
  "Incorrect password": "Email hoặc mật khẩu không đúng",
  "Email already exists": "Email đã được sử dụng",
  "Password is too short": "Mật khẩu quá ngắn",
};

const toAppError = (err: any) => {
  const msg = getServerMessage(err);
  if (msg) return new Error(MESSAGES[msg] ?? msg);
  return new Error("Không thể kết nối đến máy chủ.");
};

async function login(email: string, password: string): Promise<AuthResult> {
  try {
    const res = await api.post<AuthResponse>("/login", {
      email: email.trim(),
      password,
    });
    return {
      token: res.data.accessToken,
      user: {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
      },
      expiresAt: getJwtExpiry(res.data.accessToken),
    };
  } catch (err) {
    throw toAppError(err);
  }
}

async function getMe(userId: number): Promise<User> {
  const res = await api.get<User>(`/users/${userId}`);
  return { id: res.data.id, name: res.data.name, email: res.data.email };
}

export default { login, getMe };
