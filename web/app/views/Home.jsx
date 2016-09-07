import React from 'react';
import { observer } from 'mobx-react';
import MyComponent from 'components/MyComponent';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@observer(['store'])
@graphql(gql`
  query {
    testString
  }
`)
export default class Home extends React.Component {
  render() {
    const { loading, errors, testString } = this.props.data;
    const { name, description } = this.props.store;

    if (loading) {
      return (<h3>Loading...</h3>);
    } else if (errors) {
      return (
        <ul>
          {errors.map(error => {
            <li>{error}</li>;
          })}
        </ul>
      );
    } else {
      return (
        <div>
          <h2>Welcome to the {name} project.</h2>
          <h3>This project is {description}.</h3>
          <h4>{testString}</h4>
          <MyComponent store={this.props.store} />
        </div>
      );
    }
  }
}
