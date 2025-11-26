import React from "react";

function UserProfile() {
  return (
    <div className="bg-gray-100 p-5 max-w-xs max-h-100 max-w-sm-100 mx-w-md-100 mx-auto my-20 rounded-lg shadow-lg sm:p-4 md:max-w-sm md:p-8 text-lg md:text-xl text-sm">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-20 h-20 mx-auto bg-blue-500 sm:w-23 sm:h-23 md:w-25 md:h-25"
      />
      <h1 className="text-xl text-blue-800 my-4 sm:text-xl md:text-2xl md:font-bold">
        John Doe
      </h1>
      <p className="text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
