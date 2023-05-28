import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App () {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'foo',
    body: 'bar',
  };

  // 发送异步请求
  useEffect(() => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then((res) => {
        console.log(res);
        setTitle(res.data.title)
      })
  }, [postData])
  return (
    <div className="App">
      <h2> {title}</h2>
    </div>
  );
}

export default App;
