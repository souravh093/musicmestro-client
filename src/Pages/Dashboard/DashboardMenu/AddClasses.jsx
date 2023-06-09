import React, { useContext } from "react";
import Title from "../../../components/Title/Title";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useAxiosSecure } from "../../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";

const imageToken = import.meta.env.VITE_UPLOAD_TOKEN;

const AddClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageToken}`;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.classImage[0]);

    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const image = imgRes.data.display_url;
          const {
            availableSeats,
            className,
            instructorEmail,
            instructorName,
            price,
          } = data;

          const newClass = {
            className,
            image: image,
            price: parseFloat(price),
            instructorEmail,
            instructorName,
            availableSeats: parseFloat(availableSeats),
            status: "pending"
          };

          axiosSecure.post("/classes", newClass).then((data) => {
            if (data.data.insertedId) {
              reset();
              toast.success("Successfully added class")
            }
          });
        }
      });
    console.log(data);
  };

  const handleCustomValue = () => {
    setValue("instructorName", user?.displayName);
    setValue("instructorEmail", user?.email);
  };
  return (
    <>
      <Title
        title={"Add Classes"}
        subTitle={"Add Signing Class to you expertise"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[50rem] mx-auto p-10 rounded-lg border border-violet-700 shadow-md"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-violet-600">
              Class Name*
            </span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            className="input input-bordered w-full"
            {...register("className", { required: true })}
          />
          {errors.className && (
            <span className="text-red-500">Class Name is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-violet-600">Class Image*</span>
          </label>
          <input
            {...register("classImage", { required: true })}
            type="file"
            className="file-input border file-input-primary w-full max-w-xs"
          />
          {errors.classImage && (
            <span className="text-red-500">Class Image is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-violet-600">Instructor Name*</span>
          </label>
          <input
            type="text"
            placeholder="Instructor Name"
            className="input input-bordered w-full"
            defaultValue={user?.displayName}
            disabled
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-violet-600">
              Instructor Email*
            </span>
          </label>
          <input
            type="email"
            placeholder="Instructor Email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-violet-600">
                Available Seats*
              </span>
            </label>
            <input
              type="number"
              placeholder="Available Seats"
              className="input input-bordered w-full"
              {...register("availableSeats", { required: true })}
            />
            {errors.availableSeats && (
              <span className="text-red-500">Available Seats is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-violet-600">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
        </div>

        <div className="mt-5 form-control">
          <button
            onClick={handleCustomValue}
            type="submit"
            className="btn btn-primary w-full bg-violet-600 text-gray-50 hover:bg-violet-700"
          >
            Add Class
          </button>
        </div>
      </form>
    </>
  );
};

export default AddClasses;
