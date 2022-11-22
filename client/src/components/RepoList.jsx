import React from 'react';
import RepoListItem from './RepoListItem.jsx';


const RepoList = ({repos}) => {
  return (
    <div>
      {
        repos.map(repo => {
          return <RepoListItem key={repo.id} repo={repo}/>
        })
      }
    </div>
  )
}

export default RepoList;