/**
 * @flow
 * @relayHash ae20bb2930326bfc8ca4b261c4d94f19
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProblemsQueryVariables = {||};
export type ProblemsQueryResponse = {|
  +problems: ?$ReadOnlyArray<{|
    +id: string,
    +rank: string,
    +whofirst: string,
    +previewImgR1: {|
      +x300: string
    |},
  |}>
|};
export type ProblemsQuery = {|
  variables: ProblemsQueryVariables,
  response: ProblemsQueryResponse,
|};
*/


/*
query ProblemsQuery {
  problems {
    id
    rank
    whofirst
    previewImgR1 {
      x300
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "problems",
    "storageKey": null,
    "args": null,
    "concreteType": "Problem",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "rank",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "whofirst",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "previewImgR1",
        "storageKey": null,
        "args": null,
        "concreteType": "PuzzleImgR1Uploader",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "x300",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProblemsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProblemsQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProblemsQuery",
    "id": null,
    "text": "query ProblemsQuery {\n  problems {\n    id\n    rank\n    whofirst\n    previewImgR1 {\n      x300\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b6a0e8925d98080800c16220b07ded44';

module.exports = node;
