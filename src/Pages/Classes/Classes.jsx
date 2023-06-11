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

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/approvedclasses`
      );
      return res.data;
    },
  });
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
        <div className="grid grid-cols-4 gap-5 mt-10">
          {classes.map((item) => (
            <ClassesCard key={item._id} refetch={refetch} data={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Classes;
