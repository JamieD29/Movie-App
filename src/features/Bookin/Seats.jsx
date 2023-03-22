import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const Seats = () => {
    const param = useParams();
    const userLogged = useSelector(state=> state.userAuth.userLogged);
    console.log(userLogged);
  return (
    <div className='container mx-auto min-h-screen' >
      <div className="grid grid-cols-12 h-screen">
      <div className="col-span-8">

      </div>
      <div className="col-span-4">
        <h3 className='text-green-400 text-center text-2xl'> 0 đ</h3>
        <hr />
        <h3 className='text-xl'>Lật Mặt 48h</h3>
        <p>Location: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, sit!</p>
        <p>Ngày khởi chiếu: Date</p>
        <hr />
        <div className="flex flex-row my-5">
          <div className='w-4/5'>
            <span className='text-red-400 text-lg'>Ghế</span>
          </div>
          <div className="text-right col-span-1">
              <span className='text-green-800 text-lg'> 0đ</span>
          </div>
        </div>
        <hr />
        <div className='my-5'>
            <i>Email</i> <br />
            {userLogged.email}
        </div>

        <div className='my-5'>
            <i>Phone</i> <br />
            {userLogged.soDT}
        </div>
        <hr />

        <div className='mb-0 h-1/6 flex flex-col justify-end'>
            <button className='text-xl text-gray-100 border-2 bg-amber-500 border-amber-500 border-solid rounded-2xl py-2 px-4 hover:bg-amber-800 hover:text-gray-100 hover:border-amber-800 transition-all'>ĐẶT VÉ</button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Seats
