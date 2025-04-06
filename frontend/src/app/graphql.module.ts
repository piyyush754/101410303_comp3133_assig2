import { NgModule } from '@angular/core';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';

import { HttpLink } from 'apollo-angular/http';

import { InMemoryCache, ApolloLink } from '@apollo/client/core';

import { setContext } from '@apollo/client/link/context';
import { environment } from '../environments/environment';

const uri = environment.graphqlUri; // This will use the correct endpoint based on the build

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: new HttpHeaders(),
  }));

  // Auth middleware

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  const cache = new InMemoryCache();

  return {
    link,

    cache,
  };
}

@NgModule({
  exports: [HttpClientModule],

  providers: [
    Apollo, // Make sure Apollo is provided here

    {
      provide: APOLLO_OPTIONS,

      useFactory: createApollo,

      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
