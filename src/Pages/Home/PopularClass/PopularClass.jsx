import React from "react";
import Container from "../../../components/Shared/Container/Container";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import ClassesCard from "../../../components/Shared/ClassesCard/ClassesCard";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";

const PopularClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure("/classeslimit");
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
        subTitle={"Here are our most popular classes you can enroll?"}
        title={"Popular Classes"}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {classes.map((item) => (
          <ClassesCard key={item.name} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default PopularClass;
