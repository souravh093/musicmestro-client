// save a user in database
export const saveUser = (user) => {
  const currentUser = {
    email: user?.email,
    name: user?.displayName,
    image: user.photoURL,
  };

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

// become a admin
export const becomeAdmin = (email) => {
  const currentUser = {
    admin: true,
  };

  return fetch(`${import.meta.env.VITE_BASE_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};
