/* tslint:disable */
/* eslint-disable */
/* @relayHash 037c638d0bdb697091e140d4bb4969d6 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemsQueryVariables = {};
export type ProblemsQueryResponse = {
    readonly tagFilter: string;
    readonly rangeFilter: string;
    readonly ranges: ReadonlyArray<string | null> | null;
    readonly settings: {
        readonly isFilterMenuOpen: boolean;
    };
    readonly tags: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly " $fragmentRefs": FragmentRefs<"ProblemFilterBar_tags">;
    }> | null;
    readonly problems: ReadonlyArray<{
        readonly id: string;
        readonly rank: string;
        readonly whofirst: string;
        readonly previewImgR1: {
            readonly x300: string;
        };
    }> | null;
};
export type ProblemsQuery = {
    readonly response: ProblemsQueryResponse;
    readonly variables: ProblemsQueryVariables;
};



/*
query ProblemsQuery {
  tags(last: 100) {
    ...ProblemFilterBar_tags
    id
    name
  }
  problems(last: 100) {
    id
    rank
    whofirst
    previewImgR1 {
      x300
    }
  }
}

fragment ProblemFilterBar_tags on Tag {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 100
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "problems",
  "storageKey": "problems(last:100)",
  "args": (v0/*: any*/),
  "concreteType": "Problem",
  "plural": true,
  "selections": [
    (v1/*: any*/),
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
v4 = {
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
      "name": "rangeFilter",
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
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(last:100)",
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ProblemFilterBar_tags",
            "args": null
          }
        ]
      },
      (v3/*: any*/),
      (v4/*: any*/)
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProblemsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(last:100)",
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ]
      },
      (v3/*: any*/),
      (v4/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProblemsQuery",
    "id": null,
    "text": "query ProblemsQuery {\n  tags(last: 100) {\n    ...ProblemFilterBar_tags\n    id\n    name\n  }\n  problems(last: 100) {\n    id\n    rank\n    whofirst\n    previewImgR1 {\n      x300\n    }\n  }\n}\n\nfragment ProblemFilterBar_tags on Tag {\n  id\n  name\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '056e0ed4754377c52d307296e8f5779d';
export default node;
