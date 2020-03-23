/* tslint:disable */
/* eslint-disable */
/* @relayHash 4ad995c005c69752a6674fbfc561b90d */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemListRefetchQueryVariables = {
    last: number;
    tags: string;
    level: string;
};
export type ProblemListRefetchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"ProblemList_querya">;
};
export type ProblemListRefetchQuery = {
    readonly response: ProblemListRefetchQueryResponse;
    readonly variables: ProblemListRefetchQueryVariables;
};



/*
query ProblemListRefetchQuery(
  $last: Int!
  $tags: String!
  $level: String!
) {
  ...ProblemList_querya_3ZcBfX
}

fragment ProblemList_querya_3ZcBfX on Query {
  problems(last: $last, tags: $tags, level: $level) {
    id
    rank
    whofirst
    previewImgR1 {
      x300
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "tags",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "level",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  {
    "kind": "Variable",
    "name": "level",
    "variableName": "level"
  },
  {
    "kind": "Variable",
    "name": "tags",
    "variableName": "tags"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProblemListRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ProblemList_querya",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProblemListRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "problems",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProblemListRefetchQuery",
    "id": null,
    "text": "query ProblemListRefetchQuery(\n  $last: Int!\n  $tags: String!\n  $level: String!\n) {\n  ...ProblemList_querya_3ZcBfX\n}\n\nfragment ProblemList_querya_3ZcBfX on Query {\n  problems(last: $last, tags: $tags, level: $level) {\n    id\n    rank\n    whofirst\n    previewImgR1 {\n      x300\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2de39ce6f8623648e6ab51865596ae71';
export default node;
