import toast from "react-hot-toast";
import { useState } from "react";
import { useDeleteUser } from "../../services/mutations";
import { useGetAllUsers } from "../../services/queries";
import styles from "./UserList.module.css";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const { data, isPending, error } = useGetAllUsers();
  console.log({ data, isPending, error });
  const { mutate } = useDeleteUser();
  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const deleteUserHandler = (userId) => {
    mutate(userId, {
      onSuccess: (data) => {
        console.log("data on deletinguser", data);
        toast.error(".کاربر مورد نظر حذف شد");
      },
      onError: (error) => console.log("error in onError", error),
    });
  };
  return (
    <div>
      <table className={styles.products}>
        <thead>
          <tr>
            <th>شناسه کاربری</th>
            <th>ایمیل</th>
            <th>نام کاربر</th>
            <th>نام خانوادگی کالا</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isPending && (
            <tr>
              <td colSpan="5" className={styles.loading}>
                loading...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan="5" className={styles.errorTitle}>
                داده ای یافت نشد.
              </td>
            </tr>
          )}
          {data?.data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <div className={styles.actions}>
                  <button onClick={() => openModal(user)}>
                    edit
                    {/* <img src="edit.svg" alt="edit" /> */}
                  </button>
                  <button onClick={() => deleteUserHandler(user.id)}>
                    delete
                    {/* <img src="trash.svg" alt="delete" /> */}
                  </button>
                  <button onClick={() => navigate(`/users/${user.id}`)}>
                    details
                  </button>
                  <button onClick={() => openModal()}>Add User</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal isOpen={isModalOpen} onClose={closeModal} user={editingUser} />
    </div>
  );
};

export default UserList;
