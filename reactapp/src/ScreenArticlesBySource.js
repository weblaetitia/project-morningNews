import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Card, Icon, Modal } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';



const { Meta } = Card;

function ScreenArticlesBySource(props) {

  var apiKey = process.env.REACT_APP_NEWS_API_KEY
  var sourceKey = props.match.params.id

  // liste des articles
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    async function loadDatas() {
      var rawResponse = await fetch(
        `/getsources?sources=${sourceKey}`
      );
      var response = await rawResponse.json();
      setArticleList(response.articles);
    }
    loadDatas();
  }, []);
 
  var boucleArticles = articleList.map(function (article, i) {
    var like = {}
    props.myArticles.forEach(element => {
      if (element.wlTitle == article.title) {
        console.log('deja liké')
        like = {color: '#1890ff'}
      }
    });
    return (
      <Col xs={24} md={12} lg={8}>
        <Card style={{marginTop:'2em'}}
          cover={<img alt={article.title} src={article.urlToImage} />}
          hoverable={true}
          actions={[
            <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}/>,
            <Icon type="like" style={like} key="ellipsis" onClick={() => props.addToWishList(article.title, article.content, article.urlToImage)} />,
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
      <Row gutter={16} style={{display:'flex', flexWrap: 'wrap'}}>
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
// get articles from WL
function mapStateToProps(storeState) {
  return { myArticles: storeState.wishList }
}

// add to WL
function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(title, content, image) { 
        dispatch( {type: 'addArticle', wlTitle: title, wlContent: content, wlImage: image} ) 
    }
  }
}

export default connect(
  mapStateToProps, 
    mapDispatchToProps
)(ScreenArticlesBySource);

/* REDUX  */

