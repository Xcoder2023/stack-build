import React from 'react'

const Newpost = () => {
  return (
    <>
      <div className=' flex justify-center items-center '>
        <form className='  bg-[rgb(10,93,113)] flex flex-col gap-5 p-5'>
          <input type="text" placeholder='post tittle'className=' p-5 capitalize'required />
          <textarea name="" id="" placeholder='write your post'required className=' p-5'></textarea>
          <button className=' bg-[rgb(253,202,209)]'>Add Post</button>
        </form>
      </div>
    </>
  )
}

export default Newpost