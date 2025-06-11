"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [roomId, setRoomId] = useState<string>("");

  return (
    <div className={styles.page}>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
    </div>
  );
}