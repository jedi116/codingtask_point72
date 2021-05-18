import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser,isAuth,getCookie, signout } from '../helpers/auth';

const UserList = ({ history }) => {
  const [formData, setFormData] = useState({
      userss :[]
    });
  const [q,setQ] = useState("");
  
        useEffect(() => {
    loadProfile();
  },[]);

  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setFormData({userss:res.data});
       
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  

  
    var users = formData['userss'];

    function search(datas){
        return datas.filter(function(data){
            return data.name.toLowerCase().indexOf(q) > -1;
        });
    }
    users = search(users);

  return (
    <div className='min-h-screen bg-gray-700 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-orange-300 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
                User List
            </h1>

              <div>
                  <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search" name="search" placeholder="Search" value={q} onChange = {(e)=>setQ(e.target.value)} />
                  <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"/>
              </div>

             <div>
            {users.map((user, index) => (
              <div  key={index} className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'>
              <h1 className ='text-lg'>{user.role}</h1>
              <h3>Name :{user.name}</h3>
              <p>email : {user.email}</p>
              <p>country : {user.country}</p>
              <p>age : {user.age}</p>  
              </div>
            ))}
          </div>
                
            
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Home</span>
                </a>
              
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default UserList;

