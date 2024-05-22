"use client";
import CreateTask from "@/components/CreateTask";
import { useUser } from "@/hooks/user";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { deleteTask, getTasks, logout, updateStatus } from "./lib/data";

export default function Home() {
  const userDetails = useUser((state: any) => state.userDetails);
  const setUserDetails = useUser((state: any) => state.updateUserDetails);
  const [modal, setModa] = useState(false);
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");
  const [avatar, setAvatar] = useState(false);
  const getList = (search?: string, status?: string) => {
    getTasks(search, status).then((res) => {
      if (res) {
        setLists(res);
      }
    });
  };
  useEffect(() => {
    if (userDetails.authenticated) {
      getList();
    }
  }, [userDetails]);

  const updateStatusWrapper = (id: string, status: string) => {
    updateStatus(id, status).then((res) => {
      if (res) {
        getList();
      }
    });
  };

  const deleteTaskWrapper = (id: string) => {
    deleteTask(id).then((res) => {
      if (res) {
        getList();
      }
    });
  };

  const logOut = () => {
    logout().then((res) => {
      setUserDetails({ authenticated: false });
    });
  };
  return (
    <main>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              className="w-8 h-8 mr-2"
              width={32}
              height={32}
              src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png"
              alt="logo"
            />

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Todo App
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {userDetails.authenticated ? (
              <Image
                id="avatarButton"
                itemType="button"
                width={40}
                height={40}
                onClick={() => setAvatar(!avatar)}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={userDetails.avatar}
                alt="User dropdown"
              />
            ) : (
              ""
            )}

            {avatar ? (
              <div
                id="userDropdown"
                className="z-10 fixed right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium truncate">
                    {userDetails.email}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={logOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>

      <div className="m-11 bg-slate-800 shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-10 flex justify-between">
          <div>
            <h1 className="text-white-800 font-bold text-2xl uppercase">
              To-Do List
            </h1>
          </div>
          <div className="w-3/4 flex justify-end align-center">
            <div className="w-1/2">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for tasks"
                  required
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      getList(search);
                    }
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button
                  type="submit"
                  onClick={() => getList(search)}
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex align-center mx-2">
              <select
                id="status"
                name="status"
                onChange={(e) => {
                  getList(undefined, e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a status</option>
                <option value={""}>All</option>
                <option value="Todo">To do</option>
                <option value="In_progress">In progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex align-center mx-2">
              <button
                className="text-white bg-cyan-800 hover:bg-cyan-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => setModa(true)}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          {lists && lists.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {lists.map((list: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {list.title}
                    </th>
                    <td className="px-6 py-4">{list.description}</td>
                    <td className="px-6 py-4 max-w-6">
                      {" "}
                      <select
                        id="status"
                        name="status"
                        value={list.status}
                        onChange={(e) => {
                          updateStatusWrapper(list.id, e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose a status</option>
                        <option value="Todo">To do</option>
                        <option value="In_progress">In progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="border-none px-0"
                        onClick={() => {
                          deleteTaskWrapper(list.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="#b91c1c"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" p-4 text-center bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Start working with tasks
              </h5>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                Manage your tasks with ease. Create, edit, and delete tasks with
                a few clicks.
              </p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <a
                  href="#"
                  className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div className="text-left rtl:text-right">
                    <button
                      className="-mt-1 font-sans text-sm font-semibold"
                      type="button"
                      onClick={() => setModa(true)}
                    >
                      Create Task
                    </button>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {modal ? <CreateTask setModal={setModa} refetch={getList} /> : ""}
    </main>
  );
}
