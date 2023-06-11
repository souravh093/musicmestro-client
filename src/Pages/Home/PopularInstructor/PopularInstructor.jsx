import React, { useContext } from "react";
import Container from "../../../components/Shared/Container/Container";
import Title from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import ProfileCard from "../../../components/Shared/ProfileCard/ProfileCard";

const PopularInstructor = () => {
  const { loading } = useContext(AuthContext);
  const { data: popularInstructor = [] } = useQuery({
    queryKey: !loading,
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_BASE_URL}/instructorlimit`
      );
      return res.data;
    },
  });

  console.log(popularInstructor);
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
