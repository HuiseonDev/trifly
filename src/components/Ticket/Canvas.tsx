"use client";

import fileUploadAction from "@/data/actions/fileUploadAction";
import orderFatchAction from "@/data/actions/orderPatchAction";
import useAddVisitedPage from "@/hook/useAddVisitedPage";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import Link from "next/link";
import {
  ChangeEvent,
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const Canvas = ({
  ticketRef,
  imgBoxRef,
  id,
}: {
  ticketRef: RefObject<HTMLDivElement>;
  imgBoxRef: RefObject<HTMLDivElement>;
  id: number;
}) => {
  const canvasBoxRef = useRef<HTMLDivElement>(null);
  const colorList = ["#F94141", "#F18657", "#FFA93A", "#82A571", "#527198"];
  const [color, setColor] = useState("#F94141");
  const [brushSize, setBrushSize] = useState(4);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [history, setHistory] = useState<string[]>([]);
  const [isCanvasChange, setIsCanvasChange] = useState(false);

  // 사용성 테스트
  const { setVisitedPage } = useAddVisitedPage();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return false;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
      setIsCanvasChange(true);
      if (ticketRef.current) ticketRef.current.classList.add("imgUploading");
    };

    return null;
  };

  const handleDownload = async () => {
    // 사용자 테스트
    setVisitedPage("발자국");

    if (!ticketRef.current || !imgBoxRef.current) return;

    // 모바일 툴박스 안보이도록 클래스 추가
    ticketRef.current.classList.add("saving");

    // 이미지 다운로드
    try {
      const ticketArea = ticketRef.current;
      const imgBoxArea = imgBoxRef.current;
      const ticket = await html2canvas(ticketArea, {
        backgroundColor: "transparent",
      });
      const canvas = await html2canvas(imgBoxArea);

      // 꾸며진 이미지를 구매 내역 이미지에 반영
      if (isCanvasChange) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("attach", blob, "ticketCanvas");
            const uploadedFile = await fileUploadAction(formData);
            await orderFatchAction(id, uploadedFile);
          } else {
            console.error("img Blob 생성 실패");
          }
        }, "image/png");
      }

      // 티켓 저장
      ticket.toBlob((blob) => blob !== null && saveAs(blob, "result.png"));
    } catch (error) {
      console.error("Error converting div to image:", error);
    }

    // 모바일 툴박스 안보이도록 추가했던 클래스 삭제
    ticketRef.current.classList.remove("saving");
  };

  const canvasRef = createRef<HTMLCanvasElement>();
  let canvas: HTMLCanvasElement;
  let pos = { drawable: false, X: -1, Y: -1 };
  let ctx: CanvasRenderingContext2D;

  const saveState = () => {
    const dataUrl = canvas.toDataURL();
    setHistory((prevHistory) => [...prevHistory, dataUrl]);
  };

  const getPosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      return {
        X: touch.clientX - rect.left,
        Y: touch.clientY - rect.top,
      };
    }
    return { X: e.offsetX, Y: e.offsetY };
  };

  const redrawCanvas = () => {
    const previousState = history[history.length - 1];
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const initDraw = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) e.preventDefault();
    if (history.length === 0) saveState();

    setIsCanvasChange(true);
    if (!ctx) return;

    ctx.beginPath();
    pos = { drawable: true, ...getPosition(e) };
    ctx.moveTo(pos.X, pos.Y);

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(e) };

      if (!ctx) return;
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  };

  const finishDraw = () => {
    if (!pos.drawable) return;
    pos = { drawable: false, X: -1, Y: -1 };
    saveState();
  };

  const handleUndo = () => {
    history.pop();
    setHistory([...history]);
    redrawCanvas();
  };

  const handleClear = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    setHistory([]);
  };

  useEffect(() => {
    canvas = canvasRef.current!;
    if (!canvas) return;
    ctx = canvas.getContext("2d")!;
  }, [canvasRef]);

  useEffect(() => {
    const { clientWidth, clientHeight } = canvasBoxRef.current!;
    setCanvasSize({ width: clientWidth, height: clientHeight });
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent | TouchEvent) => initDraw(e);
    const handleMouseMove = (e: MouseEvent | TouchEvent) => draw(e);
    const handleMouseUp = () => finishDraw();
    const handleMouseOut = () => finishDraw();

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseOut);
    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
  }, [color, brushSize]);

  return (
    <div className="canvas-inner">
      <div
        className="canvas-box"
        ref={canvasBoxRef}
        style={{
          background: `url(${image}) no-repeat center / cover`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      <div className="tool-box">
        <div className="tool-inner">
          <div className="tool-top">
            <section className="tool color-box">
              <h3 className="hidden">컬러 선택</h3>
              {colorList.map((item) => (
                <label
                  className={item === color ? "act" : ""}
                  key={item}
                  style={{ background: item }}
                >
                  <input
                    type="radio"
                    name="color"
                    value={item}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </label>
              ))}
            </section>
            <section className="tool size-box">
              <h3 className="hidden">사이즈 조절</h3>
              <input
                type="range"
                className="input-range"
                min={1}
                max={10}
                value={brushSize}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value, max, style } = e.target;
                  setBrushSize(+value);
                  const percent = 90 / +max;
                  style.background = `linear-gradient(to bottom, var(--color-primary) 0%, var(--color-primary) ${percent * +value}%, var(--color-gray-50) ${percent * +value}%, var(--color-gray-50) 100%`;
                }}
              />
            </section>
          </div>
          <div className="tool-middel">
            <button type="button" className="undo" onClick={() => handleUndo()}>
              <span className="hidden">한 단계 이전으로</span>
            </button>
            <button
              type="button"
              className="clear"
              onClick={() => handleClear()}
            >
              <span className="hidden">전체 지우기</span>
            </button>
          </div>
        </div>
        <div className="btn-box">
          <Link href="/footprint" className="btn">
            이전으로
          </Link>
          <div className="file-box">
            <label htmlFor="file" className="secondary-ver">
              이미지 첨부
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              hidden
            />
          </div>
          <button className="btn primary-ver" onClick={handleDownload}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
