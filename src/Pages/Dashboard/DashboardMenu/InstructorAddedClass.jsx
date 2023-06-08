import React, { useContext } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";

const InstructorAddedClass = () => {
  const { loading, user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: instructorClasses = [] } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/${user.email}`);
      return res.data;
    },
  });
  console.log(instructorClasses)
  return (
    <>
      <Title
        title={"Your All Classes"}
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
                <td>
                  {classes?.instructorName}
                </td>
                <td>${classes?.price}</td>
                <td>{classes?.availableSeats}</td>
                <td>{0}</td>
                <td>{classes?.status}</td>
                <th>
                  <button className="btn bg-red-500 text-gray-50 btn-xs">Update</button>
                </th>
                <th>
                  <button className="btn bg-red-500 text-gray-50 btn-xs">FeedBack</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InstructorAddedClass;
