const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isStart = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              isStart ? "justify-start" : "justify-end"
            }`}
          >
            {isStart && (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            )}

            <div
              className={`flex flex-col ${
                isStart ? "items-start" : "items-end"
              }`}
            >
              <div className="mb-1">
                <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
              </div>

              <div className="h-16 w-50 rounded-lg bg-gray-200 animate-pulse" />
            </div>

            {!isStart && (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
