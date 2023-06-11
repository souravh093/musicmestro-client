import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { useAxiosSecure } from "../../hook/useAxiosSecure";
import axios from "axios";
import { toast } from "react-hot-toast";

const imagToken = import.meta.env.VITE_UPLOAD_TOKEN;

const UpdateByInstructorModal = ({
  isOpen,
  closeModal,
  updateInfo,
  refetch,
}) => {
  console.log(updateInfo?.className);
  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageUrl = `https://api.imgbb.com/1/upload?key=${imagToken}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios.post(imageUrl, formData).then((updateImage) => {
      console.log(updateImage);
      if (updateImage.data.success) {
        const image = updateImage.data.data.display_url;
        const { availableSeats, className, price } = data;
        const updateClass = {
          className,
          price: parseFloat(price),
          image: image,
          availableSeats: parseFloat(availableSeats),
        };

        console.log(updateClass);
        axiosSecure
          .put(`/classupdate/${updateInfo._id}`, updateClass)
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              toast.success("Successfully Updated");
              refetch();
            }
            console.log(data.data);
          });
      }
    });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Class
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="className"
                    >
                      Class Name
                    </label>
                    <input
                      className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.className ? "border-red-500" : ""
                      }`}
                      id="className"
                      type="text"
                      defaultValue={updateInfo?.className}
                      {...register("className", {
                        required: "Class name is required",
                      })}
                    />
                    {errors.className && (
                      <p className="text-red-500 text-xs italic">
                        {errors.className.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
                    >
                      Image
                    </label>
                    <input
                      className={`file-input file-input-bordered w-full max-w-x ${
                        errors.image ? "border-red-500" : ""
                      }`}
                      id="image"
                      type="file"
                      placeholder="Enter image URL"
                      {...register("image", {
                        required: "Image URL is required",
                      })}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-xs italic">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="availableSets"
                    >
                      Available Sets
                    </label>
                    <input
                      className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.availableSets ? "border-red-500" : ""
                      }`}
                      id="availableSeats"
                      type="text"
                      defaultValue={updateInfo?.availableSeats}
                      {...register("availableSeats", {
                        required: "Available sets are required",
                      })}
                    />
                    {errors.availableSets && (
                      <p className="text-red-500 text-xs italic">
                        {errors.availableSets.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.price ? "border-red-500" : ""
                      }`}
                      id="price"
                      type="number"
                      defaultValue={updateInfo?.price}
                      {...register("price", {
                        required: "Price is required",
                        min: {
                          value: 0,
                          message: "Price must be greater than or equal to 0",
                        },
                      })}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-xs italic">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={closeModal}
                      className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
                <hr className="mt-8 " />
                <div className="flex mt-2 justify-around">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateByInstructorModal;
