import profileImage from "../../../../assets/profileImage.jpg"

const ProfileImage = () => {
  const user = false
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
