// save a user in database
export const saveUser = (user) => {
  const currentUser = {
    email: user?.email,
  };
  console.log(currentUser.email)

  fetch(`${import.meta.env.VITE_BASE_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
