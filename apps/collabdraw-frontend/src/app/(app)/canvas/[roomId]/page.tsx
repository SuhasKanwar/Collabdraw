"use client";

import { initDraw } from "@/utils/draw";
import { useEffect, useRef } from "react";

export default function CanvasPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current) {
            initDraw(canvasRef.current);
        }
    }, [canvasRef]);

    return (
        <div>
            <canvas ref={canvasRef} width={900} height={900}>
            </canvas>
        </div>
    );
}