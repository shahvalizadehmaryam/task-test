import { useParams } from "react-router-dom";
import { useUserById } from "../../services/queries";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isPending, error } = useUserById(id);
  console.log("one data", data);
  if (isPending) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>داده ای یافت نشد.</h3>;
  }
  return (
    <div>
      <h3>userdetails - {id}</h3>
      <ul>
        <li>{data?.data?.email}</li>
        <li>{data?.data?.first_name}</li>
        <li>{data?.data?.last_name}</li>
      </ul>
    </div>
  );
};

export default UserDetails;
