import React, { useState, useEffect, useRef } from "react";
import Paper from "material-ui/Paper";
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";
import { CoordsToTree } from "../common/Helper";
import { useQuery, gql } from "@apollo/client";
import Board from "../eboard/Board";

const GET_KIFU = gql`
  query getKifu($id: ID!) {
    settings @client
    kifu(id: $id) {
      id
      identifier
      title
      playerB {
        name
        enName
      }
      playerW {
        name
        enName
      }
      bName
      bRank
      wName
      wRank
      result
      place
      komi
      steps
      previewImg {
        x300
      }
      shortDate
    }
  }
`;

const Kifu = () => {
  const id = window.location.pathname.split("/").pop();

  const { data, loading, error } = useQuery(GET_KIFU, {
    variables: { id },
  });

  const [kifu, setKifu] = useState({
    bRank: "",
    wRank: "",
    result: "",
    komi: "",
    shortDate: "",
    playerB: { enName: "" },
    playerW: { enName: "" },
  });

  const [moves, setMoves] = useState([]);
  const [step, setStep] = useState(0);
  const [settings, setSettings] = useState({ theme: "" });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data) return;
    setKifu(data.kifu);
    setSettings(data.settings);
    setMoves(data.kifu.steps.split(";"));
  }, [data]);

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = window.screen;
      const boardWidth =
        width > height ? window.innerHeight - 60 : window.innerWidth;
      if (canvasRef.current !== null) {
        canvasRef.current.width = boardWidth;
        canvasRef.current.height = boardWidth;
      }

      const board = new Board({
        theme: settings.theme,
        canvas: canvasRef.current,
        showCoordinate: true,
      });

      board.setStones(CoordsToTree(moves.slice(0, step)));
      board.render();
    }
  }, [moves, settings, step]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <div className="kifu-board">
        <canvas
          role="button"
          ref={canvasRef}
          onClick={() => {
            if (step > moves.length) return;
            setStep(step + 1);
          }}
        />
      </div>
      <div className="kifu-panel">
        <Paper>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn className="fixed-width">Black</TableRowColumn>
                <TableRowColumn>
                  {kifu.playerB.enName}({kifu.bRank})
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className="fixed-width">White</TableRowColumn>
                <TableRowColumn>
                  {kifu.playerW.enName}({kifu.wRank})
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className="fixed-width">Result</TableRowColumn>
                <TableRowColumn>{kifu.result}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className="fixed-width">Komi</TableRowColumn>
                <TableRowColumn>{kifu.komi}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className="fixed-width">Date</TableRowColumn>
                <TableRowColumn>{kifu.shortDate}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan={2}>
                  <div className="control-bar">
                    <span
                      className="move-control"
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      <i className="fa fa-fast-backward" />
                    </span>
                    <span
                      className="move-control"
                      onClick={() => {
                        step < 10 ? setStep(0) : setStep(step - 10);
                      }}
                    >
                      <i className="fa fa-backward" />
                    </span>
                    <span
                      className="move-control"
                      onClick={() => {
                        if (step <= 0) return;
                        setStep(step - 1);
                      }}
                    >
                      <i className="fa fa-play rotate" />
                    </span>
                    <span
                      className="move-control"
                      onClick={() => {
                        if (step > moves.length) return;
                        setStep(step + 1);
                      }}
                    >
                      <i className="fa fa-play" />
                    </span>
                    <span
                      className="move-control"
                      onClick={() => {
                        step < moves.length - 10
                          ? setStep(step + 10)
                          : setStep(moves.length);
                      }}
                    >
                      <i className="fa fa-forward" />
                    </span>
                    <span
                      className="move-control"
                      onClick={() => {
                        setStep(moves.length);
                      }}
                    >
                      <i className="fa fa-fast-forward" />
                    </span>
                  </div>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan={2}>
                  <div className="control-bar">
                    You can use the keyboard keys to control game records.
                  </div>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div className="clearfix" />
    </div>
  );
};

export default Kifu;
