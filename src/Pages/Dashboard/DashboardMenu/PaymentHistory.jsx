import React, { useContext } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import Container from "../../../components/Shared/Container/Container";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payment/${user?.email}`);
      return res.data;
    },
  });


  console.log(paymentHistory);
  return (
    <div>
      <Title
        title={"My Enrolled Classes"}
        subTitle={"Here is your all payment history"}
      />
      <Container>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Transaction Id</th>
                  <th>Payed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={payment.student.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{payment.student.name}</td>
                    <td>{payment.transactionId}</td>
                    <td>${payment.price}</td>
                    <td>{payment.status}</td>
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

export default PaymentHistory;
