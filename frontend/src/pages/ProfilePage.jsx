import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-base-300 rounded-2xl shadow-xl p-8 space-y-10">

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-zinc-400 text-sm">
              Manage your personal information
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2
                  bg-primary text-primary-content
                  p-2 rounded-full cursor-pointer
                  shadow-lg
                  transition-all duration-200
                  group-hover:scale-110
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading profile photo..."
                : "Click the camera icon to change photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <div className="bg-base-200 rounded-lg px-4 py-3 border border-zinc-700">
                {authUser?.fullName}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="bg-base-200 rounded-lg px-4 py-3 border border-zinc-700">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-200 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Account Information</h2>

            <div className="flex items-center justify-between text-sm border-b border-zinc-700 pb-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-4 h-4" />
                Member Since
              </div>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
