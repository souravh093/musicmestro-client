import React, { useContext } from "react";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import Container from "../../../components/Shared/Container/Container";
import { Helmet } from "react-helmet-async";
import BookedCard from "../../../components/Shared/BookedCard/BookedCard";

const StudentEnrolledClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolledClass = [], isLoading } = useQuery({
    queryKey: ["studentenrolledclass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/studentenrolledclass/${user?.email}`);
      return res.data;
    },
  });

  const enrolledItem = enrolledClass.map((item) => item.classItemsId);

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
        <title>MusicMaestro | Enrolled Classes</title>
      </Helmet>
      <Title
        title={"Student Enrolled Classed"}
        subTitle={"Here is your all Enrolled Classes"}
      />
      <Container>
        <div>{<BookedCard data={enrolledItem} />}</div>
      </Container>
    </div>
  );
};

export default StudentEnrolledClass;
