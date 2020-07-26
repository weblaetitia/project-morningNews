import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Card, Icon, Modal } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';



const { Meta } = Card;

function ScreenArticlesBySource(props) {

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

  // add article to DB
  var addArticleToDb = async (article) => {
     await fetch('/addarticle', {
        method: 'PUT',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `token=${props.token}&title=${article.title}&content=${article.content}&description=${article.description}&url=${article.url}&urlToImage=${article.urlToImage}&language=${props.language}`
      })
  }

  // loop articles
  var boucleArticles = articleList.map(function (article, i) {
    var like = {}
    props.myArticles.forEach(element => {
      if (element.title === article.title) {
        like = {color: '#1890ff'}
      }
    });
    return (
      <Col key={i.toString()} xs={24} md={12} lg={8}>
        <Card style={{marginTop:'2em'}}
          cover={<img alt={article.title} src={article.urlToImage} />}
          hoverable={true}
          actions={[
            <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}/>,
            <Icon type="like" style={like} key="ellipsis" onClick={() => {addArticleToDb(article) ; props.addToWishList(article.title, article.content, article.urlToImage)}} />,
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
  return { myArticles: storeState.wishList,
          token: storeState.userToken,
          language: storeState.lang }
}

// add to WL
function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(title, content, image) { 
        dispatch( {type: 'addArticle', title: title, content: content, urlToImage: image} ) 
    }
  }
}

export default connect(
  mapStateToProps, 
    mapDispatchToProps
)(ScreenArticlesBySource);

/* REDUX  */

