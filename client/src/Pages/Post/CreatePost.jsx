import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../../App.css'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'


const CreatePost = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const initialValues = {
    title: '',
    username: '',
    postText: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    postText: Yup.string().required('You must input post text'),
    username: Yup.string().min(3).max(20).required('You must input a username')
  })

  const handleSubmit = async (values) => {
    console.log('submitted data', values)
    try {
      const response = await axios.post('http://localhost:5000/posts', values)
      console.log('response Data', response.data)
      const {title,username,postText} = response.data
      const dataNavigate = {title,username,postText}

      if(dataNavigate.title && dataNavigate.username && dataNavigate.postText === ""){
      
         toast.error("Please Provide me a Data")
      }else{
        toast.success("SuccessFull Redirect to The Home Page")
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
      setError('Error creating post')
    }
  }

  return (
    <>
      <h1 className='text-center bg-red-500 rounded-lg w-75 mx-auto'>
        {error}
      </h1>
      <div className='mx-auto d-flex justify-center items-center flex-col form-main-div'>
        <div>
          <h1 className='text-center text-red-600 text-5xl'>Create Post</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='formContainer'>
            <div>
              <label htmlFor='title'>Title</label>
              <ErrorMessage component='span' name='title' />
              <Field
                autoComplete='off'
                type='text'
                name='title'
                placeholder='...Title'
                id='inputCreatePost'
              />
            </div>
            <div>
              <label htmlFor='postText'>PostText</label>
              <ErrorMessage component='span' name='postText' />
              <Field
                autoComplete='off'
                type='text'
                name='postText'
                placeholder='...Posttext'
                id='inputCreatePost'
              />
            </div>
            <div>
              <label htmlFor='username'>Username</label>
              <ErrorMessage component='span' name='username' />
              <Field
                autoComplete='off'
                type='text'
                name='username'
                placeholder='...Username'
                id='inputCreatePost'
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default CreatePost
