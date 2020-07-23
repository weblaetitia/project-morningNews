import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom'
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';


function ScreenSource(props) {

  const [sourcesList, setSourcesList] = useState([])
  // const [lang, setLang] = useState()
  // if (lang == undefined) {
  //   setLang('fr')
  // }

  var apiKey = process.env.REACT_APP_NEWS_API_KEY
  
  useEffect(() => {
    async function loadDatas() {
      var rawResponse = await fetch(`https://newsapi.org/v2/sources?language=${props.lang}&apiKey=${apiKey}`)
      var response = await rawResponse.json()
      setSourcesList(response.sources)

    }
    loadDatas()
  }, [props.lang])

  

  return (
    <div>
      <Nav />
      <div className="Banner" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

        <img onClick={() => props.chooseLanguage('fr')} style={{width:'30px', cursor: 'pointer', marginRight:'10px'}} src='/images/french-flag.png' alt='french' />

        <img onClick={() => props.chooseLanguage('en')} style={{width:'30px', cursor: 'pointer'}} src='/images/english-flag.png' alt='english' />

      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourcesList}
          renderItem={(item, i) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={`/images/${item.category}.png`} />
                }
                title={
                <Link to={`/articles/${item.id}`} key={i}>{item.name}</Link>
                }
                description={<p>{item.description}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

/* REDUX  */
// get languages
function mapStateToProps(storeState) {
  return { lang: storeState.lang }
}

// add to WL
function mapDispatchToProps(dispatch) {
  return {
    chooseLanguage: function(value) { 
        dispatch( {type: 'switchLanguage', lang: value} ) 
    }
  }
}

export default connect(
  mapStateToProps, 
    mapDispatchToProps
)(ScreenSource);

