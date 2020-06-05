import React, { useState, useEffect, useRef } from "react";
import { CoordsToTree } from "../common/Helper";
import { useQuery, gql } from "@apollo/client";
import { Row, Col } from "antd";
import Board from "../eboard/Board";
import {
  FastBackwardOutlined,
  FastForwardOutlined,
  BackwardOutlined,
  ForwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import "../stylesheets/containers/Kifu.scss";

const GET_KIFU = gql`
  query getKifu($id: ID!) {
    settings @client
    kifu(id: $id) {
      id
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

  const gutter = 18;
  const iconStyle = {
    fontSize: 26,
    padding: 8,
    marginTop: 10,
    marginLeft: -10,
  };

  return (
    <Row className="kifu-container" gutter={[24, 24]}>
      <Col style={{ padding: "12px 20px" }}>
        <div className="kifu-board">
          <canvas
            role="button"
            style={{ width: "90vh", height: "90vh" }}
            ref={canvasRef}
            onClick={() => {
              if (step > moves.length) return;
              setStep(step + 1);
            }}
          />
        </div>
      </Col>
      <Col style={{ padding: "30px 30px" }}>
        <Row gutter={[gutter, gutter]}>
          <Col>Black: </Col>
          <Col>
            {kifu.playerB.enName}({kifu.bRank})
          </Col>
        </Row>
        <Row gutter={[gutter, gutter]}>
          <Col>White: </Col>
          <Col>
            {kifu.playerW.enName}({kifu.wRank})
          </Col>
        </Row>
        <Row gutter={[gutter, gutter]}>
          <Col>Result: </Col>
          <Col>{kifu.result}</Col>
        </Row>
        <Row gutter={[gutter, gutter]}>
          <Col>Komi: </Col>
          <Col>{kifu.komi}</Col>
        </Row>
        <Row gutter={[gutter, gutter]}>
          <Col>Date: </Col>
          <Col>{kifu.shortDate}</Col>
        </Row>
        <Row gutter={[gutter, gutter]}>
          <Col>
            <FastBackwardOutlined
              style={iconStyle}
              onClick={() => {
                setStep(1);
              }}
            />
            <BackwardOutlined
              style={iconStyle}
              onClick={() => {
                step < 10 ? setStep(0) : setStep(step - 10);
              }}
            />
            <CaretLeftOutlined
              style={iconStyle}
              onClick={() => {
                if (step <= 0) return;
                setStep(step - 1);
              }}
            />
            <CaretRightOutlined
              style={iconStyle}
              onClick={() => {
                if (step > moves.length) return;
                setStep(step + 1);
              }}
            />
            <ForwardOutlined
              style={iconStyle}
              onClick={() => {
                step < moves.length - 10
                  ? setStep(step + 10)
                  : setStep(moves.length);
              }}
            />
            <FastForwardOutlined
              style={iconStyle}
              onClick={() => {
                setStep(moves.length);
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Kifu;
