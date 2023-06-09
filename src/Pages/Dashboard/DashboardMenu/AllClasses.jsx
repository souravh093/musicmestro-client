import React, { useContext, useState } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import FeedbackModal from "../../../components/Modal/FeedbackModal";

const AllClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [id, setId] = useState("");

  const closeFeedbackModal = () => {
    setFeedbackModal(false);
  };

  const { data: allClass = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure("/classes");
      return res.data;
    },
  });

  const handleApproved = (id) => {
    axiosSecure.patch(`/approvedclass/${id}`).then((data) => {
      if (data.data.modifiedCount) {
        refetch();
        toast.success("Successfully Approved Classes");
      }
    });
  };

  const handleDeny = (id) => {
    axiosSecure.patch(`/denyclasses/${id}`).then((data) => {
      if (data.data.modifiedCount) {
        refetch();
        toast.success("Successfully Deny Classes");
      }
    });
  };

  return (
    <div>
      <Title
        title={"All Classes"}
        subTitle={"Here is all class added by instructor website"}
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Enrolled Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allClass.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="item" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.className}</td>
                <td>{item.instructorName}</td>
                <td>{item.instructorEmail}</td>
                <td>{item.availableSeats}</td>
                <td>{item.price}</td>
                <td>
                  <div className="gap-2 flex">
                    <div
                      className={`font-bold ${
                        item.status === "pending"
                          ? "text-orange-400"
                          : item.status === "approved"
                          ? "text-sky-500"
                          : item.status === "deny"
                          ? "text-red-700"
                          : ""
                      }`}
                    >
                      {item.status}
                    </div>
                    <button
                      disabled={item.status === "approved"}
                      onClick={() => handleApproved(item?._id)}
                      className="btn btn-xs bg-sky-500 hover:bg-sky-600 text-white"
                    >
                      approve
                    </button>
                    <button
                      disabled={item.status === "deny"}
                      onClick={() => handleDeny(item?._id)}
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                    >
                      deny
                    </button>
                  </div>
                </td>
                <td>{0}</td>
                <th>
                  <button
                    onClick={() => {
                      setFeedbackModal(true);
                      setId(item?._id)
                    }}
                    className="btn bg-violet-500 text-white hover:bg-violet-600 btn-xs"
                  >
                    Feedback
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FeedbackModal
        isOpen={feedbackModal}
        id={id}
        closeModal={closeFeedbackModal}
      />
    </div>
  );
};

export default AllClasses;
