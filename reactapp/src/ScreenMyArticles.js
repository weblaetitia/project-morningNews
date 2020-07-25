import React, {useState} from "react";
import "./App.css";
import { Card, Icon, Col, Row, Alert, Modal } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {


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

  if (props.myArticles.length == 0) {
    var alert = <Alert style={{marginTop:'2em', width:'100%'}} message="Pas encore d'article dans vos favoris" type="info" />
  } 
  
  // delete article from DB when pressing trash-btn
  var deleteFromDb = async (article) => {
    await fetch(`/deletearticle?token=${props.token}&title=${article.wlTitle}`)
  }
  
  var articles = props.myArticles.map( (article) => {
      return (  <Col xs={24} md={12} lg={8}>
                <Card style={{marginTop:'2em'}}
                  cover={<img alt={article.wlTitle} src={article.wlImage} />}
                  hoverable={true}
                  actions={[
                    <Icon type="read" key="ellipsis2" onClick={() => showModal(article.wlTitle, article.wlContent)} />,
                    <Icon type="delete" key="ellipsis" 
                    onClick={ () => {deleteFromDb(article) ; props.deleteFromWL(article.wlTitle)} } />,
                  ]}
                >
                  <Meta
                    title={article.wlTitle}
                    description={article.wlContent}
                  />
                </Card>
              </Col>
              )
    })
  

  return (
  <div>
    <Nav />
    <div className="Banner" />
      <div className="site-card-wrapper">
        <Row gutter={16} style={{display:'flex', flexWrap: 'wrap'}}>
        {alert}
        {articles}
        </Row>
      </div>
      <Modal title={myTitle} visible={modalVis} onOk={handleOk} onCancel={handleCancel}>
        <p>{myContent}</p>
      </Modal>
  </div>
  );
}


// get articles from WL
function mapStateToProps(storeState) {
  return { myArticles: storeState.wishList, 
           token: storeState.userToken }
}

// delete from WL
function mapDispatchToProps(dispatch) {
  return {
    deleteFromWL: function(title) { 
        dispatch( {type: 'delete', wlTitle: title} ) 
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenMyArticles);


