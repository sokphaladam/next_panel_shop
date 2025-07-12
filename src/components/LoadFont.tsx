"use client";
import { Nova_Square, Nokora } from "next/font/google";

const nova_square = Nova_Square({
  weight: ["400"],
  subsets: ["latin"],
});

const nokara = Nokora({
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  style: "normal",
  subsets: ["khmer", "latin"],
});

export function LoadFont() {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${nokara.style.fontFamily} !important;
          font-style: ${nokara.style.fontStyle} !important;
          font-weight: ${nokara.style.fontWeight} !important;
        }

        .card-number {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 50px 25px 10px;
          font-size: 23px;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }

        .card-holder {
          margin: 30px 25px 0 25px;
          text-transform: uppercase;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }

        .card-end {
          margin-left: 25px;
          text-transform: uppercase;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }
      `}</style>
    </>
  );
}
