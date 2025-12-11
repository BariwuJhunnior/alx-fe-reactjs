import React from 'react';
import { useQuery } from '@tanstack/react-query';

const url = 'https://jsonplaceholder.typicode.com/posts/';

function PostsComponent() {

  const fetchData = async () => {
    const response = await fetch(url);
    return response.json();
  };

  const {fetchPosts, isError, isLoading} = useQuery('fetchData', fetchData);

  //Handle isLoading State
  if (isLoading) {
    return <div>Loading....</div>
  }

  //Handle Error State
  if (isError) {
    return <div>Error Loading Data!</div>
  }

  //Render the fetched Data
  return (
    <div>
      {fetchPosts.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default PostsComponent
