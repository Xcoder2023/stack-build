import React, { useState, useEffect } from "react";
import icon from "./assets/delete.png"

const itemsPerPage = 5;

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const handleToggle = () => setToggle(!toggle);
  const handleUpdate = () => setUpdate(!update);

  // GET_USER
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyapi.io/data/v1/user?limit", {
        headers: {
          "app-id": "65a19335e135fe610e0131e7",
        },
      });
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // filteredData

  useEffect(() => {
    const filteredResults = userData.filter((user) =>
      user.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
    setCurrentPage(1);
  }, [searchQuery, userData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // DELETE_USER
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "app-id": "65a19335e135fe610e0131e7",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("User deleted successfully");
        fetchData();
      } else {
        console.error("Error deleting user:", response.statusText);
        setSuccessMessage("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      setSuccessMessage("Error deleting user");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <>
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]">
        <p className=" flex text-center justify-center text-[rgb(10,93,113)] pt-5">
          STACKBUILD BLOGG APP
        </p>
        <div className=" flex justify-center items-center gap-10 pt-[5rem]">
          <div className=" flex justify-center">
            <input
              type="text"
              placeholder="Enter post title"
              required
              className=" p-4 border-none  capitalize h-11 w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className=" flex p-3  bg-[rgb(10,93,113)] text-white text-center h-11">
              Search
            </button>
          </div>

          <div className=" flex justify-center">
            <button
              className=" bg-[rgb(10,93,113)] p-3 text-white text-center h-11 rounded-md hover:underline"
              onClick={handleToggle}
            >
              + New Post
            </button>
          </div>
        </div>
          
          {/* creating new post */}

        <div className={toggle ? "newpost active " : "newpost"}>
          <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-5">
            <p className=" text-center text-[rgb(250,254,162)]">
              Create a new post
            </p>
            <input
              type="text"
              placeholder="title"
              className=" p-5 capitalize"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <input
              type="text"
              name="Firstname"
              placeholder="First Name"
              className=" p-3 capitalize"
            />
            <input
              type="text"
              name="Lastname"
              placeholder="Last Name"
              className=" p-3 capitalize"
            />

            <div>
              <input type="file" name="file" className=" text-[#FFF] P-10" />
            </div>

            <button className=" bg-[rgb(253,202,209)]">Add Post</button>
          </form>
        </div>

        {/* updating  a post */}
      <div className={update ? "newpost active " : "newpost"}>
        <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-5">
          <p onClick={handleUpdate} className=" text-[red] cursor-pointer flex justify-end"><img src={icon} alt="" className=" w-8" /></p>
          <input
            type="text"
            placeholder="Tittle"
            className=" p-4 capitalize"
            required
          />
          <input
            type="text"
            placeholder="First Name"
            className=" p-4 capitalize"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className=" p-4 capitalize"
            required
          />
          <input
            type="file"
            placeholder="upload image"
            className=" p-4 text-white"
            required
          />
          
          <button className=" bg-[rgb(253,202,209)] p-3">Update Post</button>
        </form>
        </div>

        {successMessage && (
          <div className="text-[red] text-center mt-4">{successMessage}</div>
        )}

        {/* Display filtered user data */}
        <div className="text-white flex flex-wrap mt-24">
          {currentItems.map((user) => (
            <div
              key={user.id}
              className="w-1/5 p-4 flex flex-col items-center gap-2"
            >
              <img
                src={user.picture}
                alt={user.lastName}
                className=" w-32 rounded-xl"
              />
              <p className="capitalize">
                Name: {user.title} {user.firstName} {user.lastName}
              </p>
              <div className=" flex gap-5">
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  className=" bg-[red] p-1 rounded-md capitalize"
                >
                  delete post
                </button>
                <button className=" bg-[rgb(10,93,113)] p-1 rounded-md capitalize" onClick={handleUpdate}>
                  update post
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline mx-2"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredData.length}
            className="bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
