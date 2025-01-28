import { useGetAllUsers } from "../../services/queries";
import styles from "./UserList.module.css";

const UserList = () => {
  const { data, isPending, error } = useGetAllUsers();
  console.log({ data, isPending, error });
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
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <div className={styles.actions}>
                  <button>edit</button>
                  <button>delete</button>
                  {/* <button onClick={() => showEditModal(productItem.id)}>
                    <img src="edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => showDeleteModal(productItem.id)}>
                    <img src="trash.svg" alt="delete" />
                  </button> */}
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
