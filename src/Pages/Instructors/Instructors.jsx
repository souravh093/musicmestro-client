import React, { useContext } from "react";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import Container from "../../components/Shared/Container/Container";
import ProfileCard from "../../components/Shared/ProfileCard/ProfileCard";

const Instructors = () => {
  const { loading } = useContext(AuthContext);
  const { data: instructors = [],  } = useQuery({
    queryKey: ["allinstructor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/allinstructor`
      );
      return res.data;
    },
  });

  return (
    <div>
      <TitleBanner
        title={"All Instructor"}
        subtitle={"Here is world best singer and instructor"}
      />
      <Container>
        <div className="grid grid-cols-4">
            {
                instructors.map(instructor => <ProfileCard key={instructor._id} data={instructor} />)
            }
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
