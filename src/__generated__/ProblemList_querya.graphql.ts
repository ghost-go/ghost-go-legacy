/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemList_querya = {
    readonly problems: ReadonlyArray<{
        readonly id: string;
        readonly rank: string;
        readonly whofirst: string;
        readonly previewImgR1: {
            readonly x300: string;
        };
    }> | null;
    readonly " $refType": "ProblemList_querya";
};
export type ProblemList_querya$data = ProblemList_querya;
export type ProblemList_querya$key = {
    readonly " $data"?: ProblemList_querya$data;
    readonly " $fragmentRefs": FragmentRefs<"ProblemList_querya">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ProblemList_querya",
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
(node as any).hash = 'dfe3642a1e2d82931c240044f9f293d9';
export default node;
