import React, { useState } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import BecomeAdminModal from "../../../components/Modal/BecomeAdminModal";
import { becomeAdmin, becomeInstructor } from "../../../api/auth";
import { toast } from "react-hot-toast";
import BecomeInstructorModal from "../../../components/Modal/BecomeInstructorModal";

const AllUsers = () => {
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalInstructor, setModalInstructor] = useState(false);
  const [email, setEmail] = useState("");

  const modalHandlerAdmin = (email) => {
    becomeAdmin(email).then((data) => {
      console.log(data);
      toast.success("This user Admin successfully");
      closeModalAdmin();
    });
  };

  const modalHandlerInstructor = (email) => {
    becomeInstructor(email).then((data) => {
      console.log(data);
      toast.success("This user Instructor successfully");
      closeModalInstructor();
    });
  };

  const closeModalAdmin = () => {
    setModalAdmin(false);
  };

  const closeModalInstructor = () => {
    setModalInstructor(false);
  };
  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/users`).then((res) => res.json()),
  });

  if (isLoading) {
    <h2>Loading...</h2>;
  }
  console.log(modalAdmin);
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
                  <button
                    onClick={() => {
                      setEmail(user.email);
                      setModalInstructor(true);
                    }}
                    className="btn btn-xs mr-3 bg-violet-700 hover:bg-violet-600 text-white"
                  >
                    Make Instructor
                  </button>
                  <button
                    onClick={() => {
                      setModalAdmin(true);
                      setEmail(user.email);
                    }}
                    className="btn btn-xs bg-violet-700 hover:bg-violet-600 text-white"
                  >
                    Make Admin
                  </button>
                </th>
                <th>
                  <button className="btn btn-xs bg-red-500 text-white">
                    Remove User
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BecomeAdminModal
        modalHandler={modalHandlerAdmin}
        email={email}
        isOpen={modalAdmin}
        closeModal={closeModalAdmin}
      />
      <BecomeInstructorModal
        modalHandler={modalHandlerInstructor}
        email={email}
        isOpen={modalInstructor}
        closeModal={closeModalInstructor}
      />
    </div>
  );
};

export default AllUsers;
