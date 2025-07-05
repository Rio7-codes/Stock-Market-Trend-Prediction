import { LogOut, User } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-2 text-sm cursor-pointer">
      <User />
      {user ? (
        <div className="flex items-center gap-2">
          <span>{user.name}</span>
          <button onClick={logout}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <a href="/login">Guest</a>
      )}
    </div>
  );
}