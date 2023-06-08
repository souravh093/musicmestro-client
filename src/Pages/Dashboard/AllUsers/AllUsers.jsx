import React, { useContext, useState } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import BecomeAdminModal from "../../../components/Modal/BecomeAdminModal";
import { becomeAdmin, becomeInstructor } from "../../../api/auth";
import { toast } from "react-hot-toast";
import BecomeInstructorModal from "../../../components/Modal/BecomeInstructorModal";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const AllUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalInstructor, setModalInstructor] = useState(false);
  const [email, setEmail] = useState("");
  const [axiosSecure] = useAxiosSecure();

  const modalHandlerAdmin = (email) => {
    becomeAdmin(email).then((data) => {
      console.log(data);
      refetch();
      toast.success("This user Admin successfully");
      closeModalAdmin();
    });
  };

  const modalHandlerInstructor = (email) => {
    becomeInstructor(email).then((data) => {
      console.log(data);
      refetch();
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

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/users`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/users/${id}`)
          .then((data) => {
            refetch();
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
      }
    });
  };

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
            {allUsers.map((user, index) => (
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
                    className={`btn btn-xs bg-violet-700 hover:bg-violet-600 text-white ${
                      user.instructor ? "cursor-not-allowed  opacity-50" : ""
                    }`}
                    disabled={user.instructor}
                  >
                    Make Instructor
                  </button>
                  <button
                    onClick={() => {
                      setModalAdmin(true);
                      setEmail(user.email);
                    }}
                    className={`btn btn-xs bg-violet-700 hover:bg-violet-600 text-white ${
                      user.admin ? "cursor-not-allowed  opacity-50" : ""
                    }`}
                    disabled={user.admin}
                  >
                    Make Admin
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs hover:border hover:text-gray-800 bg-red-500 text-white"
                  >
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
