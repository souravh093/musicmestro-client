import React, { useContext, useState } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import ShowFeedBackModal from "../../../components/Modal/ShowFeedBackModal";
import UpdateByInstructorModal from "../../../components/Modal/UpdateByInstructorModal";
import { Helmet } from "react-helmet-async";

const InstructorAddedClass = () => {
  const { loading, user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [modalFeedback, setModalFeedback] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [updateInfo, setUpdateInfo] = useState(null);

  const {
    data: instructorClasses = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/${user.email}`);
      return res.data;
    },
  });

  const closeModalFeedback = () => {
    setModalFeedback(false);
  };

  const closeModalUpdate = () => {
    setUpdateModal(false);
    setUpdateInfo(null);
  };

  if (isLoading) {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MusicMaestro | My Class</title>
      </Helmet>
      <Title
        title={"My Classes"}
        subTitle={"Here is your all Classes you added"}
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Total Enroll Students</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {instructorClasses.map((classes, index) => (
              <tr key={classes._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={classes?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{classes?.className}</div>
                    </div>
                  </div>
                </td>
                <td>{classes?.instructorName}</td>
                <td>${classes?.price}</td>
                <td>{classes?.availableSeats}</td>
                <td>{classes?.totalEnrollStudent || 0}</td>
                <td
                  className={`font-bold ${
                    classes?.status === "pending"
                      ? "text-orange-400"
                      : classes?.status === "approved"
                      ? "text-sky-500"
                      : classes?.status === "deny"
                      ? "text-red-700"
                      : ""
                  }`}
                >
                  {classes?.status}
                </td>
                <th>
                  <button
                    onClick={() => {
                      setUpdateInfo(classes);
                      setUpdateModal(true);
                    }}
                    className="btn bg-red-500 hover:bg-red-600 text-gray-50 btn-xs"
                  >
                    Update
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      setModalFeedback(true);
                      setFeedback(classes?.feedback?.feedback);
                    }}
                    className="btn bg-red-500 hover:bg-red-600 text-gray-50 btn-xs"
                  >
                    Show FeedBack
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShowFeedBackModal
        isOpen={modalFeedback}
        closeModal={closeModalFeedback}
        feedback={feedback}
      />

      {updateInfo && (
        <UpdateByInstructorModal
          isOpen={updateModal}
          closeModal={closeModalUpdate}
          updateInfo={updateInfo}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default InstructorAddedClass;
