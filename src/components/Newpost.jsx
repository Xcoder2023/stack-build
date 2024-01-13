import React from "react";

const Newpost = () => {
  return (
    <>
      {/* <div className=" flex justify-center items-center "> */}
        <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-5">
          <p className=" text-center text-[rgb(250,254,162)]">Create a new post</p>
          <input
            type="text"
            placeholder="Enter Your post tittle"
            className=" p-5 capitalize text-center"
            required
          />
          <textarea
            name=""
            id=""
            placeholder="write your post"
            required
            className=" px-3 py-2 placeholder:text-center"
          ></textarea>
          <button className=" bg-[rgb(253,202,209)]">Add Post</button>
        </form>
      {/* </div> */}
    </>
  );
};

export default Newpost;
