import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="
        h-full
        w-16
        lg:w-72
        border-r
        bg-(--color-bg)
        flex flex-col
        transition-all
      "
    >
      <div className="border-b p-3 lg:p-5">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm">Show Online Only</span>
          </label>

          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} Online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3
              flex items-center
              justify-center lg:justify-start
              gap-0 lg:gap-3
              hover:bg-gray-200 transition
              ${selectedUser?._id === user._id ? "bg-gray-300" : ""}
            `}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
              />

              {onlineUsers.includes(user._id) && (
                <span
                  className="
                  absolute bottom-0 right-0
                  w-2.5 h-2.5
                  bg-green-500
                  rounded-full
                  ring-2 ring-(--color-bg)
                "
                />
              )}
            </div>

            <div className="hidden lg:block min-w-0 text-left">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
