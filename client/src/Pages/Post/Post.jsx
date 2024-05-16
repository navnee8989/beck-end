import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoCloseCircle } from 'react-icons/io5'
import { toast } from 'react-toastify'
import axios from 'axios'

function Post() {
  const [data, setData] = useState({})
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/byId/${id}`).then((res) => {
      const { title, postText, username, createdAt } = res.data
      const mainData = { title, postText, username, createdAt }
      setData(mainData)
    })

    axios.get(`http://localhost:5000/comments/${id}`).then((res) => {
      setComments(res.data)
    })
  }, [id])

  const addComment = () => {
    axios
      .post(
        'http://localhost:5000/comments',
        {
          commentBody: newComment,
          PostId: id
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          toast.error('response Data Error')
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username
          }
          setComments([...comments, commentToAdd])
          setNewComment('')
        }
      })
      .catch((error) => {
        console.error('Error adding comment: ', error)
        toast.error('Failed to add comment')
      })
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`)
      setComments(comments.filter((item) => item.id !== commentId))
      toast.success('Comment deleted successfully')
    } catch (error) {
      console.log('error while deleting the comment', error)
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className='container-fluid mx-auto'>
      <div className='row mx-auto'>
        <div className='leftSide col-6 d-flex rounded-2xl justify-center items-center'>
          <div className='post rounded-2xl w-full' id='individual'>
            <div className='footer text-center text-bold text-4xl'>
              {data.username}
            </div>
            <div className='title text-bold text-center bg-red-300 my-2'>
              {data.title}
            </div>
            <div className='body rounded-lg text-black'>{data.postText}</div>
          </div>
        </div>

        <div className='container d-flex gap-2 flex-col col-6 pt-12'>
          <div className='comment-body items-start'>
            <input
              type='text'
              placeholder='Add a comment...'
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              className='border-pink-400 border rounded-lg focus:shadow-lg w-80 h-16 pl-5 hover:focus:shadow-emerald-400 hover:focus:shadow-xl'
            />
            <button className='btn btn-success h-16 ml-3' onClick={addComment}>
              Add Comment
            </button>
          </div>
          <div className='show-comments items-end pt-10 w-50'>
            {comments.map((item) => (
              <div
                className='comment-item w-full border shadow-emerald-300 py-3 d-flex justify-between items-center px-3 flex-col'
                key={item.id}
              >
                <div className='d-flex justify-end text-sm items-start text-red-500 ml-4 cursor-pointer w-full'>
                  {item.username}
                </div>
                <div className='div'>
                  <div>{item.commentBody}</div>
                </div>
                <button
                  className='text-3xl '
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <IoCloseCircle className='text-red-700' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
