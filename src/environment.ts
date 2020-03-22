import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { commitLocalUpdate } from 'react-relay';

function fetchQuery(
  operation: any,
  variables: any,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

commitLocalUpdate(environment, store => {
  store.getRoot().setValue([
    'all',
    "18k-10k",
    "9k-5k",
    "4k-1k",
    "1d-3d",
    "4d-6d",
  ], "ranges");
  store.getRoot().setValue('all', "tagFilter");
  store.getRoot().setValue('all', "rangeFilter");

  const fieldKey = "settings";
  const __typename = "Settings";

  const dataID = `client:${__typename}`;
  const record = store.create(dataID, __typename);

  record.setValue(false, "isFilterMenuOpen");

  // environment.retain({
  //   root: {
  //     dataID,
  //     variables: {},
  //     node: { selections: [{
  //       kind: 'ScalarField',
  //       name: 'isFilterMenuOpen',
  //     }]}
  //   }
  // });

  store.getRoot().setLinkedRecord(record, fieldKey);

  // const query = store.getRoot().getLinkedRecord('query');
  // query.setLinkedRecords([
  //   { name: 'all' },
  //   { name: '18k-10k' },
  //   { name: '9k-5k' },
  //   { name: '4k-1k' },
  //   { name: '1d-3d' },
  //   { name: '4d-6d' },
  // ], 'ranges');
  // const user = store.getRoot().getLinkedRecord('query');
  // initialize user notes to an empty array.
  // user.setLinkedRecords([], 'notes');
});



export default environment;