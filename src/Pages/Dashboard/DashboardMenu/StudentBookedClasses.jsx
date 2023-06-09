import React from "react";
import { useCart } from "../../../hook/useCart";
import Title from "../../../components/Title/Title";
import Container from "../../../components/Shared/Container/Container";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";

const StudentBookedClasses = () => {
  const [carts, cartRefetch] = useCart();
  const [axiosSecure] = useAxiosSecure();

  const handleDeleteClass = (id) => {
    axiosSecure.delete(`/bookedclassdelete/${id}`).then((data) => {
      if (data.data.deletedCount > 0) {
        cartRefetch();
        toast.success("Successfully Deleted");
      }
    });
  };
  return (
    <div>
      <Title
        title={"All Booked Classes"}
        subTitle={"Here is you all Booked class"}
      />
      <Container>
        <div>
          <div>
            <div></div>
            <div></div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Instructor Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, index) => (
                  <tr key={cart._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={cart.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{cart.name}</td>
                    <td>{cart.instructorName}</td>
                    <td>{cart.price}</td>
                    <th>
                      <button
                        onClick={() => handleDeleteClass(cart._id)}
                        className="btn bg-red-500 hover:bg-red-600 text-white btn-ghost btn-xs"
                      >
                        Remove Class
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StudentBookedClasses;
