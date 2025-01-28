import { useState, useEffect } from "react";
import { useAddUser, useEditUser } from "../../services/mutations";
import toast from "react-hot-toast";

const UserModal = ({ isOpen, onClose, user = null }) => {
  const [name, setName] = useState(user?.name || "");
  const [job, setJob] = useState(user?.job || "");

  const { mutate: addUserMutate } = useAddUser();
  const { mutate: editUserMutate } = useEditUser();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setJob(user.job || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, job };

    if (user) {
      editUserMutate(
        { ...userData, id: user.id },
        {
          onSuccess: () => {
            toast.success("ویرایش با موفقیت انجام شد.");
            onClose();
          },
        }
      );
    } else {
      addUserMutate(userData, {
        onSuccess: () => {
          toast.success("کاربر جدید ایجاد شد.");
          onClose();
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {user ? "ویرایش کاربر" : "افزودن کاربر"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              شغل
            </label>
            <input
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
              className="w-full py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              بستن
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              {user ? "اعمال تغییرات" : "افزودن کاربر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
