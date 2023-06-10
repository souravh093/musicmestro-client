import React, { useState } from "react";
import { useCart } from "../../../hook/useCart";
import Title from "../../../components/Title/Title";
import Container from "../../../components/Shared/Container/Container";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import CheckoutModal from "../../../components/Modal/CheckoutModal";

const StudentBookedClasses = () => {
  const [carts, cartRefetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = carts.reduce((acc, cur) => cur.price + acc, 0);
  console.log(totalPrice);

  const [checkOutPrice, setCheckOutPrice] = useState({
    price: totalPrice,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

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
        {carts.length === 0 ? (
          <div className="flex justify-center">
            <div>
              <div className="text-center text-4xl text-red-500 font-bold mb-3">
                No Booked Cart Available Now
              </div>
              <Link
                to="/classes"
                className="btn bg-violet-700 text-white hover:bg-violet-600"
              >
                Selected Classes
              </Link>
            </div>
          </div>
        ) : (
          <Container>
            <div>
              <div className="bg-violet-700 rounded-md text-gray-50 py-2 px-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">Total Class: {carts.length}</h2>
                </div>
                <div>
                  <h2 className="text-xl">Total Price: ${totalPrice}</h2>
                </div>
                <div>
                  <button onClick={() => setIsOpen(true)} className="btn">Pay</button>
                </div>
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
                        <td>${cart.price}</td>
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
        )}
      </Container>
      <CheckoutModal
        isOpen={isOpen}
        checkOutPrice={checkOutPrice}
        closeModal={closeModal}
      />
    </div>
  );
};

export default StudentBookedClasses;
