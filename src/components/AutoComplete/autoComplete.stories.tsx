import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  
  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ]

  const handleFetch1 = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name=>({value: name}))
  }

  const renderOption1 = (item: DataSourceType) => {
    return (
      <>
        <h2>Name: {item.value} </h2>
      </>
    )
  }


  const handleFetch2 = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }



  // https://coding.imooc.com/learn/questiondetail/179929.html
  const renderOption2 = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <h2>Name: {itemWithNumber.value}</h2>
        <p>Number: {itemWithNumber.number}</p>
      </>
    )
  }


  const handleFetch3 = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption3 = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h2>Name: {itemWithGithub.value}</h2>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch3}
      onSelect={action('selected')}
      renderOption={renderOption3}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)