import React, { useContext } from "react";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import Container from "../../components/Shared/Container/Container";
import ProfileCard from "../../components/Shared/ProfileCard/ProfileCard";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const { loading } = useContext(AuthContext);
  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["allinstructor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/allinstructor`
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
    <div>
      <Helmet>
        <title>MusicMaestro | Instructors</title>
      </Helmet>
      <TitleBanner
        title={"All Instructor"}
        subtitle={"Here is world best singer and instructor"}
      />
      <Container>
        <div className="grid grid-cols-4">
          {instructors.map((instructor) => (
            <ProfileCard key={instructor._id} data={instructor} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
