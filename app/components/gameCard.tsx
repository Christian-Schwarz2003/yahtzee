"use client";
import styles from "./gameCard.module.css";
import React, {useRef, useState} from "react";
import Legend from "./legend";
import PlayerSection from "./playerSection";

export default function GameCard() {
  const [playerCount, setPlayerCount] = useState(2);
  const playerCountInputRef = useRef<HTMLInputElement>(null);
  const handlePlayerCountChange = () => {
    const playerCount = parseInt(playerCountInputRef.current?.value || "0");

    setPlayerCount(playerCount);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>
          <label htmlFor="playerCount"> PlayerCount</label>
          <input
            type="number"
            min={0}
            max={10}
            defaultValue={2}
            id="playerCount"
            ref={playerCountInputRef}
            onChange={handlePlayerCountChange}
          />
        </span>
      </div>
      <div className={styles.gameCard}>
        <Legend></Legend>
        {new Array(playerCount).fill(0).map((_, index) => (
          <PlayerSection key={index}></PlayerSection>
        ))}
      </div>
    </div>
  );
}
