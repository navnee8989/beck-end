const { default: axios } = require('axios')
const { useState } = require('react')

const createcontext = createcontext()
const[username,setusername]=useState('')

const users_name = () => {
  axios
    .get('http://localhost:5000/comments')
    .then((res) => {
      console.log(res)
      if(res.data.error){
        console.log("Error while Fatching Data");
      }else{
        setusername(res.data.username)
      }
    })
    .catch((error) => console.log(error))
}
