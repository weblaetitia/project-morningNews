import React from "react";
import "./App.css";
import { Card, Icon, Col, Row } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';




const { Meta } = Card;

function ScreenMyArticles(props) {
  
  const articles = props.myArticles.map( (article) => {
    return  <Col span={8} >
              <Card style={{marginTop:'2em'}}
                cover={<img alt={article.wlTitle} src={article.wlImage} />}
                hoverable={true}
                actions={[
                  <Icon type="read" key="ellipsis2" />,
                  <Icon type="delete" key="ellipsis" />,
                ]}
              >
                <Meta
                  title={article.wlTitle}
                  description={article.wlContent}
                />
              </Card>
            </Col>
  })

  return (
  <div>
    <Nav />
    <div className="Banner" />
      <div className="site-card-wrapper">
        <Row gutter={16}>
        {articles}
        </Row>
      </div>
  </div>
  );
}


function mapStateToProps(storeState) {
  console.log(storeState.wishList)
  return { myArticles: storeState.wishList }
}
// console.log(myArticles)
// myArticles est un []  
export default connect(
  mapStateToProps, 
  null
)(ScreenMyArticles);


// export default ScreenMyArticles;
