import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Card, Icon } from "antd";
import Nav from "./Nav";


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  var apiKey = process.env.REACT_APP_NEWS_API_KEY
  console.log(props.match.params.id)
  var sourceKey = props.match.params.id

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
          actions={[
            <Icon type="read" key="ellipsis2" />,
            <Icon type="like" key="ellipsis" />,
          ]}
        >
          <Meta title={article.title} description={article.content} />
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <Nav />
      <div className="Banner" />
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {boucleArticles}
          </Row>
        </div>
    </div>
  );
}

export default ScreenArticlesBySource;
