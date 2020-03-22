/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProblemFilterBar_tags = ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly " $refType": "ProblemFilterBar_tags";
}>;
export type ProblemFilterBar_tags$data = ProblemFilterBar_tags;
export type ProblemFilterBar_tags$key = ReadonlyArray<{
    readonly " $data"?: ProblemFilterBar_tags$data;
    readonly " $fragmentRefs": FragmentRefs<"ProblemFilterBar_tags">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ProblemFilterBar_tags",
  "type": "Tag",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '0d6d86f0040eb6cd006e425ee47fea63';
export default node;
