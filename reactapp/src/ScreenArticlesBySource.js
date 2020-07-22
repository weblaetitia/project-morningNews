import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Card, Icon, Modal } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';

// const store;


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  var apiKey = process.env.REACT_APP_NEWS_API_KEY
  console.log(props.match.params.id)
  var sourceKey = props.match.params.id

  // liste des articles
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    async function loadDatas() {
      var rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${sourceKey}&apiKey=${apiKey}`
      );
      var response = await rawResponse.json();
      setArticleList(response.articles);
    }
    loadDatas();
  }, []);

  var boucleArticles = articleList.map(function (article, i) {

    return (
      <Col span={8} >
        <Card style={{marginTop:'2em'}}
          cover={<img alt={article.title} src={article.urlToImage} />}
          hoverable={true}
          actions={[
            <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}/>,
            <Icon type="like" key="ellipsis" onClick={() => props.addToWishList(article.title, article.content)} />,
          ]}
        >
          <Meta title={article.title} description={article.content} />
        </Card>
      </Col>
    );
  });

  // Modal
  const [modalVis, setModalVis] = useState(false)
  const [myTitle, setMyTitle] = useState()
  const [myContent, setMyContent] = useState()
  

  var showModal = (title, content) => {
    setModalVis(true)
    setMyTitle(title)
    setMyContent(content)
  };

  var handleOk = () => {
    setModalVis(false)
  };

  var handleCancel = () => {
    setModalVis(false)
  };



  return (
    <div>
      <Nav />
      <div className="Banner" />
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {boucleArticles}
          </Row>
        </div>
        <Modal title={myTitle} visible={modalVis} onOk={handleOk} onCancel={handleCancel}>
          <p>{myContent}</p>
        </Modal>
    </div>
  );
}


/* REDUX  */

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(title, content) { 
        dispatch( {type: 'addArticle', wlTitle: title, wlContent: content} ) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(ScreenArticlesBySource);

/* REDUX  */

// export default ScreenArticlesBySource;
