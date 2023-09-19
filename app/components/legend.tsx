import styles from "./legend.module.css";
import React, {Fragment} from "react";

export default function Legend() {
  return (
    <Fragment>
      <span> Name </span>
      <span>Ones</span>
      <span>Twos</span>
      <span>Threes</span>
      <span>Fours</span>
      <span>Fives</span>
      <span>Sixes</span>
      <span>Total Upper</span>
      <span>{"Bonus (if total is >= 63)"}</span>
      <span>Total Upper with Bonus</span>
      <div></div>
      <span>3 of a Kind</span>
      <span>4 of a Kind</span>
      <span>Full House</span>
      <span>Small Straight</span>
      <span>Large Straight</span>
      <span>Yahtzee</span>
      <span>Chance</span>
      <span>Total Lower</span>
      <span>Grand Total</span>
    </Fragment>
  );
}
