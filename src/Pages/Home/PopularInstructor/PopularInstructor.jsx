import React, { useContext } from "react";
import Container from "../../../components/Shared/Container/Container";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import ProfileCard from "../../../components/Shared/ProfileCard/ProfileCard";

const PopularInstructor = () => {
  const { loading } = useContext(AuthContext);
  const { data: popularInstructor = [], isLoading } = useQuery({
    queryKey: !loading,
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_BASE_URL}/instructorlimit`
      );
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
    <Container>
      <Title
        subTitle={
          "Our top Instructor. You can learn Singing to him/her best result to you"
        }
        title={"Popular Instructor"}
      />
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
        {popularInstructor.map((instructor) => (
          <ProfileCard key={instructor._id} data={instructor} />
        ))}
      </div>
    </Container>
  );
};

export default PopularInstructor;
