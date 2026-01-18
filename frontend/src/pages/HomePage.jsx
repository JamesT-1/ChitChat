import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-size-[200%_200%]">
      <div className="flex items-center justify-center pt-20 px-0 sm:px-4">
        <div
          className="
            bg-white
            rounded-none sm:rounded-lg
            shadow-none sm:shadow-xl
            w-full
            h-[calc(100vh-5rem)]
            sm:h-[calc(100vh-8rem)]
            sm:max-w-6xl
          "
        >
          <div className="flex h-full overflow-hidden">
            <Sidebar />

            <div className="flex-1">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
