import { useGetAllUsers } from "../../services/queries";

const Pagination = ({ page, setPage }) => {
  const { data } = useGetAllUsers(page);
  // Handle next and previous page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (data?.total_pages || 1)) {
      setPage(newPage);
    }
  };
  return (
    <div className="flex justify-center py-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        &lt;
      </button>
      <span className="px-3 py-1 text-gray-700 font-bold">
        {page} از {data?.total_pages || 1}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= (data?.total_pages || 1)}
        className="px-3 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
