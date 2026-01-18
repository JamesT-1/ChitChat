import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-16 bg-(--color-bg)">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-(--color-text)">
          Welcome To ChitChat!
        </h2>
        <p className="text-(--color-text)">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;
