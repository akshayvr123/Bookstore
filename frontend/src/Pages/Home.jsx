import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import BooksCard from '../Components/Home/BooksCard'
import BooksTable from '../Components/Home/BooksTable'

const Home = () => {
    const [books,setBooks]=useState([])
    const [loading,setLoading]=useState(false)
    const [showType,setShowtype]=useState('table')

    useEffect(()=>{
    setLoading(true)
    axios
    .get("https://bookstoreserver-git-main-akshay-vrs-projects.vercel.app//books")
    .then((response)=>{
      console.log(response.data.data);
      setBooks(response.data.data)
      setLoading(false)
    })
    .catch((err)=>{
        console.log(err)
        setLoading(false)
    })
},[])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
        onClick={()=>{setShowtype("table")}}
        >Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
        onClick={()=>{setShowtype("card")}}
        >Card</button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'></MdOutlineAddBox>
        </Link>
      </div>
      {loading?(
        <Spinner></Spinner>
      ): showType==='table' ?(
        <BooksTable books={books}/>
      ): <BooksCard books={books}/>}
    </div>
  )
}

export default Home
