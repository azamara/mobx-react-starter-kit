import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';

import ClickStore from 'stores/click';
import makeRoutes from 'libs/routes';
import makeClient from 'libs/apollo';

const store = new ClickStore();
const routes = makeRoutes(store);
const client = makeClient('https://www.graphqlhub.com/graphql');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App routes={routes} />
      </Provider>
    </ApolloProvider>, document.querySelector('#app')
  );
});
