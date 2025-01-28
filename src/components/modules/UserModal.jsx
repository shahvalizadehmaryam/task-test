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
      setName(user.name);
      setJob(user.job);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, job };

    if (user) {
      // If user is passed, edit the existing user
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
      // If no user is passed, add a new user
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
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? "ویرایش کاربر" : "افزودن کاربر"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>شغل</label>
            <input
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {user ? "اعمال تغییرات" : "افزودن کاربر"}
          </button>
        </form>
        <button onClick={onClose}>بستن</button>
      </div>
    </div>
  );
};

export default UserModal;
