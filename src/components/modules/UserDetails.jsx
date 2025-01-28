import { useParams } from "react-router-dom";
import { useUserById } from "../../services/queries";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isPending, error } = useUserById(id);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-gray-500 text-lg">Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-red-500 text-lg">داده ای یافت نشد.</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          <span className="text-blue-500">{id}</span>- جزئیات کاربر
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="font-medium text-gray-600 w-32">ایمیل:</span>
            <span className="text-gray-800">{data?.data?.email}</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium text-gray-600 w-32">نام کاربر:</span>
            <span className="text-gray-800">{data?.data?.first_name}</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium text-gray-600 w-32">
              نام خانوادگی کاربر:
            </span>
            <span className="text-gray-800">{data?.data?.last_name}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
