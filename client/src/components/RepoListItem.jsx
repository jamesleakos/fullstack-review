import React from 'react';

const RepoListItem = ({repo}) => (
  <div>
    <a href={repo.repo_url}>{repo.name + '     -     ' + repo.forks_count + ' forks'}</a>
  </div>
)

export default RepoListItem;