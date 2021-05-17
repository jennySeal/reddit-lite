import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import Header from './components/Header';
import Story from './components/Story';
import Sidebar from './components/Sidebar';
import SubSidebar from './components/SubSidebar';
import Footer from './components/Footer';


import './styles/styles.scss'

import {fetchingStories, gotStories, fetchStoriesFailed} from './features/stories/storiesSlice';
import {updateSearch} from './features/searches/searchSlice';
import {selectSearches} from './features/searches/searchSlice';

const API_Endpoint = 'https://www.reddit.com/'


const App = () => {
  
const searchTerm = useSelector(selectSearches);
const url = `${API_Endpoint}${searchTerm}`;
const dispatch = useDispatch(); 
  
const handleFetchStories = useCallback(() => {
  dispatch(fetchingStories);
  axios.get(url).then(({data}) => {
    dispatch(gotStories(data))
    window.scrollTo(0, 0)
  })
.catch(() => 
dispatch(fetchStoriesFailed));
return console.error()
}, [url, dispatch]);

useEffect(() => {
  localStorage.setItem('history', searchTerm);  
    handleFetchStories();
    }, [handleFetchStories, searchTerm])
 
const onSubRedditClick = useCallback((event) => {
  const subRedditParams = "top/.json?count=25";
  console.log(`${event.currentTarget.value}${subRedditParams}`)
  event.preventDefault();
  localStorage.setItem('history', searchTerm);
  dispatch(updateSearch(`${event.currentTarget.value}${subRedditParams}`))
},[dispatch, searchTerm]);

const onOpenPost = useCallback((event) => {
 const openPostParams = `/${event.currentTarget.value}.json`;
  console.log(openPostParams);
  event.preventDefault();
  localStorage.setItem('history', searchTerm);
  dispatch(updateSearch(openPostParams))
},[dispatch, searchTerm]);

  return (
    <div className='outerContainer'>
    <Header/>
    <div className='innerContainer'>
    <Sidebar />
    <Story onOpenPost={onOpenPost}/>
    <SubSidebar onSubRedditClick={onSubRedditClick}/>
    </div>
    <Footer/>
    </div>
  )
}
export default App;