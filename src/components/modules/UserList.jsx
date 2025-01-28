import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDeleteUser } from "../../services/mutations";
import { useGetAllUsers } from "../../services/queries";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";
import Cookies from "js-cookie";
import Pagination from "./Pagination";

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1); // Pagination state
  const navigate = useNavigate();

  const { data, isPending, error } = useGetAllUsers(page);
  const { mutate } = useDeleteUser();
  console.log("users", data);

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
      onSuccess: () => {
        toast.error(".کاربر مورد نظر حذف شد");
      },
      onError: (error) => console.log("error in onError", error),
    });
  };

  const exitUserHandler = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-4">
      <div className="text-sky-800 font-semibold text-sm lg:text-xl w-52 pb-6 text-center">
        لیست کاربران
        <hr className="bg-sky-800 h-[2px] mt-1" />
      </div>
      <div className="flex gap-x-4 justify-start">
        <button
          onClick={() => openModal()}
          className="px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          افزودن کاربر
        </button>
        <button
          onClick={exitUserHandler}
          className="px-4 py-2 font-bold bg-red-500 text-white rounded hover:bg-red-600"
        >
          خروج کاربر
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="shadow-lg rounded-lg border border-gray-300 overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm rounded-xl">
            <thead className="bg-sky-900 text-white">
              <tr>
                <th className="px-4 py-3 border">شناسه کاربری</th>
                <th className="px-4 py-2 border">ایمیل</th>
                <th className="px-4 py-2 border">نام کاربر</th>
                <th className="px-4 py-2 border">نام خانوادگی </th>
                <th className="px-4 py-2 border">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {isPending && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <LoadingSpinner />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-red-800 font-bold"
                  >
                    داده ای یافت نشد.
                  </td>
                </tr>
              )}
              {data?.data?.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 even:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.first_name}</td>
                  <td className="px-4 py-2 border">{user.last_name}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2 justify-center items-center">
                      <button onClick={() => navigate(`/users/${user.id}`)}>
                        <IoSearch className="text-sky-700 text-xl ml-2" />
                      </button>
                      <button onClick={() => openModal(user)}>
                        <FiEdit className="text-blue-500 text-xl" />
                      </button>
                      <button onClick={() => deleteUserHandler(user.id)}>
                        <MdDeleteForever className="text-red-500 text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} setPage={setPage} />
      <UserModal isOpen={isModalOpen} onClose={closeModal} user={editingUser} />
    </div>
  );
};

export default UserList;
