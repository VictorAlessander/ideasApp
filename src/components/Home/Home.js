import React from 'react';
import DefaultLayout from '../../containers/UI/DefaultLayout';
import Ideas from '../Ideas/Ideas';


class Home extends React.Component {

  render () {
    return (
      <DefaultLayout>
        <Ideas />
      </DefaultLayout>
    );
  }
}

export default Home;