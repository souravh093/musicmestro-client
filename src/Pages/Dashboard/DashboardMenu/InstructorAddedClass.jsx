import React, { useContext, useState } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import ShowFeedBackModal from "../../../components/Modal/ShowFeedBackModal";

const InstructorAddedClass = () => {
  const { loading, user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [modalFeedback, setModalFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { data: instructorClasses = [] } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/${user.email}`);
      return res.data;
    },
  });
  console.log(instructorClasses);

  const closeModalFeedback = () => {
    setModalFeedback(false);
  };
  return (
    <>
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
                  <button className="btn bg-red-500 hover:bg-red-600 text-gray-50 btn-xs">
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
    </>
  );
};

export default InstructorAddedClass;
