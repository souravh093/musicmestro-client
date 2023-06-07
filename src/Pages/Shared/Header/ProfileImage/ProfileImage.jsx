import { useContext } from "react";
import profileImage from "../../../../assets/profileImage.jpg"
import { AuthContext } from "../../../../Provider/AuthProvider";

const ProfileImage = () => {
  const {user} = useContext(AuthContext);
  return (
    <img
      className="rounded-full"
      referrerPolicy="no-referrer"
      src={user && user.photoURL ? user.photoURL : profileImage}
      alt="profile image in header"
      height="32"
      width="32"
    />
  );
};

export default ProfileImage;
