import toast from "react-hot-toast";
import { useDeleteUser } from "../../services/mutations";
import { useGetAllUsers } from "../../services/queries";
import styles from "./UserList.module.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const { data, isPending, error } = useGetAllUsers();
  console.log({ data, isPending, error });
  const editUserHandler = () => {};
  const { mutate } = useDeleteUser();
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
                  <button onClick={() => editUserHandler(user.id)}>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
