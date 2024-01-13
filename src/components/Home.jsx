import React, { useState, useEffect } from "react";

const itemsPerPage = 5;

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = () => setToggle(!toggle);

  useEffect(() => {
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

    fetchData();
  }, []);

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

  return (
    <>
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]">
        <p className=" flex text-center justify-center text-[rgb(10,93,113)] pt-5">STACKBUILD BLOGG APP</p>
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
                <button className=" bg-[red] p-1 rounded-md">
                  delete post
                </button>
                <button className=" bg-[rgb(10,93,113)] p-1 rounded-md">
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
