import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import Container from "../../components/Shared/Container/Container";
import ClassesCard from "../../components/Shared/ClassesCard/ClassesCard";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  const { loading } = useContext(AuthContext);

  const { data: classes = [], refetch, isLoading } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/approvedclasses`
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
          <title>MusicMaestro | Classes</title>
        </Helmet>
      <TitleBanner
        title={"All Classes"}
        subtitle={"Here are all classes by world best instructor and singer"}
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {classes.map((item) => (
            <ClassesCard key={item._id} refetch={refetch} data={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Classes;
