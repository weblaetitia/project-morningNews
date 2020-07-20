import React, { useState , useEffect} from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";


function ScreenSource() {

  const [sourcesList, setSourcesList] = useState([])

  var apiKey = process.env.REACT_APP_NEWS_API_KEY
  
  useEffect(() => {
    async function loadDatas() {
      var rawResponse = await fetch(`https://newsapi.org/v2/sources?language=fr&apiKey=${apiKey}`)
      var response = await rawResponse.json()
      setSourcesList(response.sources)
    }
    loadDatas()
  }, [])

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourcesList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={<p>{item.description}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
