/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemList_query = {
    readonly problems: ReadonlyArray<{
        readonly id: string;
        readonly rank: string;
        readonly whofirst: string;
        readonly previewImgR1: {
            readonly x300: string;
        };
    }> | null;
    readonly " $refType": "ProblemList_query";
};
export type ProblemList_query$data = ProblemList_query;
export type ProblemList_query$key = {
    readonly " $data"?: ProblemList_query$data;
    readonly " $fragmentRefs": FragmentRefs<"ProblemList_query">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ProblemList_query",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "tags",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "level",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "problems",
      "storageKey": null,
      "args": [
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
};
(node as any).hash = '81f036d5b7332e46e5277c034680f824';
export default node;
