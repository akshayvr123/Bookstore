import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {id}=useParams()
  const {enqueueSnackbar}=useSnackbar()
  const handleDeleteBook=()=>{
    setLoading(true)
    axios.delete(`https://vercel.com/akshay-vrs-projects/bookstore_server/2QEeoz5LngPrVCqasSdLw3aZX3re/books/${id}`)
    .then(()=>{
      setLoading(false)
      enqueueSnackbar("Book deleted successfully",{variant:"success"})
      navigate('/')
    })
    .catch((err)=>{
      setLoading(false)
      console.log(err);
      alert("An error happened plz check console")
      enqueueSnackbar("Error",{variant:"error"})
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 m-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button onClick={handleDeleteBook} className='p-4 bg-red-600 text-white m-8 w-full'>Yes Delete it</button>

      </div>
    </div>
  )
}

export default DeleteBook
