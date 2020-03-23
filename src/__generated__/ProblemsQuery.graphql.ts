/* tslint:disable */
/* eslint-disable */
/* @relayHash ff49e3e5b9b5e2cf1c679672ca3ed003 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemsQueryVariables = {
    last: number;
    tags: string;
    level: string;
};
export type ProblemsQueryResponse = {
    readonly tagFilter: string;
    readonly levelFilter: string;
    readonly ranges: ReadonlyArray<string | null> | null;
    readonly settings: {
        readonly isFilterMenuOpen: boolean;
    };
    readonly tags: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly " $fragmentRefs": FragmentRefs<"ProblemFilterBar_tags">;
    }> | null;
    readonly " $fragmentRefs": FragmentRefs<"ProblemList_querya">;
};
export type ProblemsQuery = {
    readonly response: ProblemsQueryResponse;
    readonly variables: ProblemsQueryVariables;
};



/*
query ProblemsQuery(
  $last: Int!
  $tags: String!
  $level: String!
) {
  tags(last: 100) {
    ...ProblemFilterBar_tags
    id
    name
  }
  ...ProblemList_querya_3ZcBfX
}

fragment ProblemFilterBar_tags on Tag {
  id
  name
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
    "kind": "Literal",
    "name": "last",
    "value": 100
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = [
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
],
v5 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "tagFilter",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "levelFilter",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "ranges",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "settings",
      "storageKey": null,
      "args": null,
      "concreteType": "Settings",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isFilterMenuOpen",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProblemsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(last:100)",
        "args": (v1/*: any*/),
        "concreteType": "Tag",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ProblemFilterBar_tags",
            "args": null
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "ProblemList_querya",
        "args": (v4/*: any*/)
      },
      (v5/*: any*/)
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProblemsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(last:100)",
        "args": (v1/*: any*/),
        "concreteType": "Tag",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "problems",
        "storageKey": null,
        "args": (v4/*: any*/),
        "concreteType": "Problem",
        "plural": true,
        "selections": [
          (v2/*: any*/),
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
      },
      (v5/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProblemsQuery",
    "id": null,
    "text": "query ProblemsQuery(\n  $last: Int!\n  $tags: String!\n  $level: String!\n) {\n  tags(last: 100) {\n    ...ProblemFilterBar_tags\n    id\n    name\n  }\n  ...ProblemList_querya_3ZcBfX\n}\n\nfragment ProblemFilterBar_tags on Tag {\n  id\n  name\n}\n\nfragment ProblemList_querya_3ZcBfX on Query {\n  problems(last: $last, tags: $tags, level: $level) {\n    id\n    rank\n    whofirst\n    previewImgR1 {\n      x300\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3125b2c0efe5b8fdfd5d4c1ee6afd47f';
export default node;
