

const Header = () => {
    const { data, isPending, error } = useUserById();
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      {/* Avatar and Username Section */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40" // Replace with your avatar image URL
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">John Doe</span> {/* Replace with username */}
        </div>
      </div>

      {/* Project Name */}
      <div className="text-blue-500 text-xl font-semibold">
        Project Name {/* Replace with project name */}
      </div>
    </header>
  );
};

export default Header;
