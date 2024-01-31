import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../reducer/userSlice";
import { fetchDelete } from "../../reducer/deleteSlice";
import { fetchEdit } from "../../reducer/editSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/Error";
import Navbar from "../../components/Navbar";

const User = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.todo.data);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [editModal, setEditModal] = useState(false);
  
  const [editedUser, setEditedUser] = useState({
    id: null,
    name: "",
    job: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(fetchDelete(id));
  };

  const handleEdit = (userData) => {
    setEditedUser({
      id: userData.id,
      name: userData.first_name,
      job: "",
    });
    setEditModal(true);
  };

  const handleSaveEdit = () => {
    dispatch(fetchEdit(editedUser));
    setEditModal(false);
  };

  const handleModalClose = () => {
    setEditModal(false);
  };

  // pengecekan code & API berjalan atau tidak
  // console.log("todo", todo);
  // console.log("status", status);
  // console.log("error", error);

  if (status === "loading") return <Loading />;

  if (status === "failed") return <ErrorComponent message={error} />;

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-3 gap-5">
          {status === "succeeded" &&
            users.map((user) => (
              <div key={user.id} className="max-w-xs">
                <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col items-center pt-10 pb-10">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {user.first_name} {user.last_name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </span>
                    <div className="flex mt-4 md:mt-6">
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 ms-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {editModal && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 text-center"
                      id="modal-headline"
                    >
                      Edit User
                    </h3>
                    <div className="mt-5 sm:mt-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                      />
                    </div>
                    <div className="mt-5 sm:mt-4">
                      <label
                        htmlFor="job"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job
                      </label>
                      <input
                        type="text"
                        id="job"
                        name="job"
                        value={editedUser.job}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            job: e.target.value,
                          })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-3">
                    <button
                      onClick={handleSaveEdit}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleModalClose}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default User;
