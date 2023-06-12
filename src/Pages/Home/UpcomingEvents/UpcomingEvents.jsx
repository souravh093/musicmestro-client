import React from "react";
import Title from "../../../components/Title/Title";
import Container from "../../../components/Shared/Container/Container";
import { useQuery } from "react-query";
import axios from "axios";

const UpcomingEvents = () => {
  const { data: events = [] } = useQuery({
    queryKey: ["upcomming"],
    queryFn: async () => {
      const res = await axios("upcomingevent.json");
      return res.data;
    },
  });
  console.log(events);
  return (
    <div className="mt-20">
      <Title
        title={"Our Upcoming Online Events"}
        subTitle={
          "Here is our every monthly event in website you can learn and earn"
        }
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((event) => (
            <div
              key={event.eventName}
              className="card border-2 border-violet-200/50 lg:card-side bg-violet-50 shadow-xl"
            >
              <figure>
                <img
                  className="w-96 h-full object-cover"
                  src={event.image}
                  alt="Album"
                />
              </figure>
              <div className="card-body grid grid-cols-2">
                <div className="flex flex-col gap-5">
                  <h2 className="card-title">{event.eventName}</h2>
                  <p>{event.eventDescription}</p>
                  <p>{event.eventTime}</p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <h2 className="text-6xl font-bold text-violet-500">{event.eventDate}</h2>
                    <h3 className="text-2xl text-violet-400 font-semibold">{event.month}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UpcomingEvents;
