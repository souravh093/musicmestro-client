import React, { useContext } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import Container from "../../../components/Shared/Container/Container";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payment/${user?.email}`);
      return res.data;
    },
  });

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
    <div>
      <Helmet>
        <title>MusicMaestro | Payment History</title>
      </Helmet>
      <Title
        title={"Payment History"}
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
                  <th>Status</th>
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
