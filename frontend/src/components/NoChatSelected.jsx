import logo from "../logo.jpg";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center 
            justify-center animate-bounce"
          >
            <img
              src={logo}
              alt="Chat Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Chat!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
