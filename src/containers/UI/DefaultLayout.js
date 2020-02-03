import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

class DefaultLayout extends React.Component {

  render () {
    return (
      <Layout>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <div className="default-layout">
                {this.props.children}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

}

export default DefaultLayout;