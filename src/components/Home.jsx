import React, { useState } from "react";


const Home = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  return (
    <>
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]">
        <div className=" flex flex-col gap-10 pt-10">
          <div className=" flex justify-center pt-[3rem">
            <input
              // search input
              type="text"
              placeholder="Enter post tittle"
              required
              className=" p-4 border-none w-[30%] capitalize"
            />
            {/* search button */}
            <button className=" p-4 bg-[rgb(10,93,113)] text-white">
              search
            </button>
          </div>

          <div className=" flex justify-center">
            {/* new post button */}
            <button
              className=" bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline"
              onClick={handleToggle}
            >
              + New Post
            </button>
          </div>
        </div>

            {/* new post page starts here */}

        <div className={toggle ? "newpost active " : "newpost"}>
          <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-5">
            <p className=" text-center text-[rgb(250,254,162)]">
              Create a new post
            </p>
            <input
              type="text"
              placeholder="Enter Your post tittle"
              className=" p-5 capitalize text-center"
              required
            />
            <input type="text" name="Firstname" placeholder="First Name" className=" p-3 capitalize" />
            <input type="text" name="Lastname" placeholder="Last Name" className=" p-3 capitalize" />

            <div>
            <input type="file" name="file" className=" text-[#FFF] P-10"  />
            </div>

            <button className=" bg-[rgb(253,202,209)]">Add Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
