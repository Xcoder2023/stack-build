import React, { useState, useEffect } from "react";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [postTitle, setPostTitle] = useState("");

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
  }, [searchQuery, userData]);

  return (
    <>
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]">
        <div className=" flex flex-col gap-10 pt-10">
          <div className=" flex justify-center pt-[3rem]">
            <input
              type="text"
              placeholder="Enter post title"
              required
              className=" p-4 border-none w-[30%] capitalize"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className=" p-4 bg-[rgb(10,93,113)] text-white">
              Search
            </button>
          </div>

          <div className=" flex justify-center">
            <button
              className=" bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline"
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
              placeholder="Enter Your post title"
              className=" p-5 capitalize text-center"
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
        <div className="text-white">
          {filteredData.map((user) => (
            <div key={user.id}>
              <p>Title: {user.title}</p>
              <p>firstName: {user.firstName}</p>
              <p>lastName: {user.lastName}</p>
              <img src={user.picture} alt={user.lastName} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
