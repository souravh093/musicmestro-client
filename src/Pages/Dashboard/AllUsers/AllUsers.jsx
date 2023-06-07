import React from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";

const AllUsers = () => {
  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/users`).then((res) => res.json()),
  });

  if (isLoading) {
    <h2>Loading...</h2>;
  }
  return (
    <div>
      <Title
        title={"All Users"}
        subTitle={"Here is all users login this website"}
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <th>
                  <button className="btn btn-xs mr-3 bg-violet-700 hover:bg-violet-600 text-white">Make Instructor</button>
                  <button className="btn btn-xs bg-violet-700 hover:bg-violet-600 text-white">Make Admin</button>
                </th>
                <th>
                  <button className="btn btn-xs bg-red-500 text-white">Remove User</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
