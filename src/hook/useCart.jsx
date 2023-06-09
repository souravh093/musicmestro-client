import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCart = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: carts = [], refetch: cartRefetch } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(
        `/carts?email=${user.email}`
      );
      return res.data;
    },
  });

  return [carts, cartRefetch];
};
