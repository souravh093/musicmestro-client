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
  const { data: enrolledClass = [] } = useQuery({
    queryKey: ["studentenrolledclass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/studentenrolledclass/${user?.email}`);
      return res.data;
    },
  });

  const enrolledItem = enrolledClass.map((item => item.classItemsId))

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
        <div>
          {<BookedCard data={enrolledItem} />}
        </div>
      </Container>
    </div>
  );
};

export default StudentEnrolledClass;
