import React from "react";
import "./App.css";
import { Card, Icon, Col, Row } from "antd";
import Nav from "./Nav";

import {connect} from 'react-redux';




const { Meta } = Card;

function ScreenMyArticles(props) {
  const FakeArticles = [
    {
      title: "Bitcoin Power",
      description: "Le bitcoin revient de très loin et peut toujours...",
      img: "/images/bitcoin.jpg",
      content:
        "L’agenda politique sur la monnaie numérique publique, ainsi que ma récente visite du Musée créé par la Banque de France m’ont conduit à de multiples réflexions. Qu’un ministre ne veuille pas de monnaie privée sur notre sol (curieux, d’ailleurs que ce soit précisément ce mot à double sens qui affleure ici) c’est une chose. Que la chose soit impensable en est une autre.On va parler ici d’une monnaie privée émise justement par… un ministre, et pas n’importe lequel. Au cœur de l’appareil d’Etat, et en plein centre de la France. ",
    }
  ];

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
