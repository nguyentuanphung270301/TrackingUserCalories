import React, { useEffect, useState } from 'react'
import userApi from '../../api/modules/user.api'

const GetUser = () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await userApi.getAllUser()
        setUserList(response)
        console.log(userList)
      } catch (error) {
        console.log('Failed to fetch user list: ', error)
      }
    }
    fetchUserList()
  },[])

  // if (typeof userList !== 'undefined' && Array.isArray(userList)) {
  //   // Do something with userList
  //   userList.map(user => console.log(user));
  // } else {
  //   // Handle the case where userList is not an array
  //   console.log('userList is not an array!');
  // }
  return (
    <div>
    <h1>List of data</h1>
    <ul>
      {userList.map(item => (
        <li key={item.id}>
          <p>{item.lastName}</p>
          <p>{item.email}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default GetUser