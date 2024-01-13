import React from "react";

const Home = () => {
  return (
    <>
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]">
        <div className=" flex flex-col gap-10 pt-10" >
          <form className=" flex justify-center pt-[3rem">
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
          </form>

          <div className=" flex justify-center">
            
            {/* new post button */}
            <button className=" bg-[rgb(10,93,113)] p-3 text-white text-center">+ New Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
