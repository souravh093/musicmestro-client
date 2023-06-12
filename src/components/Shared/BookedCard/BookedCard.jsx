import React from "react";

const BookedCard = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Transaction Id</th>
                <th>Payed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {item.map((i) => (
                <tr key={i._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={i.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{i.className}</td>
                  <td>{i.InstructorEmail}</td>
                  <td>${i.price}</td>
                  <td>{i.availableSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default BookedCard;
