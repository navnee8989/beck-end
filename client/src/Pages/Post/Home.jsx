import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts')
        if (!response || response.data === null) {
          setError('Data not given by the Server')
        } else {
          setData(response.data)
        }
      } catch (error) {
        setError('Error fetching data: ' + error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`)
      setData(data.filter((item) => item.id !== id))
    } catch (error) {
      setError(`Error deleting post: ${error}`)
    }
  }

  const handlePostClick = (id) => {
    navigate(`/post/${id}`)
  }

  return (
    <>
      <div className='bg-slate-500'>
        <h1 className='text-4xl text-center text-white py-5 bg-red-500'>Posts</h1>
      </div>

      <div className='container mt-5 '>
        <div className='row '>
          {data.map((item) => (
            <div className='col-md-4' key={item.id}>
              <div className='card mb-4'>
                <div
                  className='card-body'
                  onClick={() => handlePostClick(item.id)}
                >
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className='card-text my-6 w-full h-10'>{item.username}</p>
                  <h5 className='card-title w-full h-10'>{item.title}</h5>
                  <p className='card-text w-full h-40'>{item.postText}</p>
                </div>
                <div className='button pb-10 d-flex justify-center items-center'>
                  <button
                    className='btn btn-danger w-50 mx-auto '
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!data.length && (
        <div className='w-50 h-5 outline  text-center bg-red-600 rounded-lg py-5 mx-auto text-white text-4xl text-bold'>
          Not Getting Data for internal error
        </div>
      )}
    </>
  )
}

export default Home
