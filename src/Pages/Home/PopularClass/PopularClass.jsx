import React from "react";
import Container from "../../../components/Shared/Container/Container";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import axios from "axios";
import ClassesCard from "../../../components/Shared/ClassesCard/ClassesCard";

const PopularClass = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios("classes.json");
      return res.data;
    },
  });
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
