import {readBuilderProgram} from "typescript";
import styles from "./playerSection.module.css";
import React, {Fragment, useRef, useState} from "react";

interface Errors {
  ones: boolean;
  twos: boolean;
  threes: boolean;
  fours: boolean;
  fives: boolean;
  sixes: boolean;
  ThreeOfAKind: boolean;
  FourOfAKind: boolean;
  Chance: boolean;
}

interface Inputs {
  ones: number;
  twos: number;
  threes: number;
  fours: number;
  fives: number;
  sixes: number;
  threeOfAKind: number;
  fourOfAKind: number;
  fullHouse: boolean;
  smallStraight: boolean;
  largeStraight: boolean;
  yahtzee: boolean;
  chance: number;
}
interface CalculatedValues {
  totalUpper: number;
  bonus: boolean;
  totalUpperWithBonus: number;
  totalLower: number;
  grandTotal: number;
}

interface Blocked {
  fullHouse: boolean;
  smallStraight: boolean;
  largeStraight: boolean;
  yahtzee: boolean;
}
export default function PlayerSection() {
  const onesRef = useRef<HTMLInputElement>(null);
  const twosRef = useRef<HTMLInputElement>(null);
  const threesRef = useRef<HTMLInputElement>(null);
  const foursRef = useRef<HTMLInputElement>(null);
  const fivesRef = useRef<HTMLInputElement>(null);
  const sixesRef = useRef<HTMLInputElement>(null);
  const totalUpperRef = useRef<HTMLInputElement>(null);
  const bonusRef = useRef<HTMLInputElement>(null);
  const totalUpperWithBonusRef = useRef<HTMLInputElement>(null);

  const threeOfAKindRef = useRef<HTMLInputElement>(null);
  const fourOfAKindRef = useRef<HTMLInputElement>(null);
  const fullHouseRef = useRef<HTMLInputElement>(null);
  const smallStraightRef = useRef<HTMLInputElement>(null);
  const largeStraightRef = useRef<HTMLInputElement>(null);
  const yahtzeeRef = useRef<HTMLInputElement>(null);
  const chanceRef = useRef<HTMLInputElement>(null);
  const totalLowerRef = useRef<HTMLInputElement>(null);
  const grandTotalRef = useRef<HTMLInputElement>(null);

  const blockFullHouseRef = useRef<HTMLInputElement>(null);
  const blockSmallStraightRef = useRef<HTMLInputElement>(null);
  const blockLargeStraightRef = useRef<HTMLInputElement>(null);
  const blockYahtzeeRef = useRef<HTMLInputElement>(null);


  const [blocked, setBlocked] = useState<Blocked>({
    fullHouse: false,
    smallStraight: false,
    largeStraight: false,
    yahtzee: false,
  });
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    totalUpper: 0,
    bonus: false,
    totalUpperWithBonus: 0,
    totalLower: 0,
    grandTotal: 0,
  });

  const [errors, setErrors] = useState<Errors>({
    ones: false,
    twos: false,
    threes: false,
    fours: false,
    fives: false,
    sixes: false,
    ThreeOfAKind: false,
    FourOfAKind: false,
    Chance: false,
  });

  const handleBlock = () => {
    const blocked: Blocked = {
      fullHouse: blockFullHouseRef.current?.checked || false,
      smallStraight: blockSmallStraightRef.current?.checked || false,
      largeStraight: blockLargeStraightRef.current?.checked || false,
      yahtzee: blockYahtzeeRef.current?.checked || false,
    };

    console.log(blocked);
    setBlocked(blocked);
  };
  const handleChange = () => {
    const inputValues = readAllInputFields();
    const valid = validate(inputValues);
    console.log(valid);
    if (valid) {
      calculate(inputValues);
    }
  };

  const calculate = (inputValues: Inputs) => {
    console.log(inputValues);
    //upper
    const {ones, twos, threes, fours, fives, sixes} = inputValues;

    const totalUpper = ones + twos + threes + fours + fives + sixes;
    const bonus = totalUpper >= 63;
    const totalUpperWithBonus = totalUpper + (bonus ? 35 : 0);

    //lower
    const {
      threeOfAKind,
      fourOfAKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yahtzee,
      chance,
    } = inputValues;
    const totalLower =
      threeOfAKind +
      fourOfAKind +
      (fullHouse ? 25 : 0) +
      (smallStraight ? 30 : 0) +
      (largeStraight ? 40 : 0) +
      (yahtzee ? 50 : 0) +
      chance;
    const grandTotal = totalUpperWithBonus + totalLower;
    const calculatedValues: CalculatedValues = {
      totalUpper,
      bonus,
      totalUpperWithBonus,
      totalLower,
      grandTotal,
    };

    console.log(calculatedValues);
    setCalculatedValues(calculatedValues);
  };

  const readAllInputFields = () => {
    //read number values
    const onesValueStr: string = onesRef.current?.value || "";
    const twosValueStr: string = twosRef.current?.value || "";
    const threesValueStr: string = threesRef.current?.value || "";
    const foursValueStr: string = foursRef.current?.value || "";
    const fivesValueStr: string = fivesRef.current?.value || "";
    const sixesValueStr: string = sixesRef.current?.value || "";
    const threeOfAKindValueStr: string = threeOfAKindRef.current?.value || "";
    const fourOfAKindValueStr: string = fourOfAKindRef.current?.value || "";
    const chanceValueStr: string = chanceRef.current?.value || "";
    //convert to numbers
    const onesValue: number = onesValueStr === "" ? 0 : parseInt(onesValueStr);
    const twosValue: number = twosValueStr === "" ? 0 : parseInt(twosValueStr);
    const threesValue: number =
      threesValueStr === "" ? 0 : parseInt(threesValueStr);
    const foursValue: number =
      foursValueStr === "" ? 0 : parseInt(foursValueStr);
    const fivesValue: number =
      fivesValueStr === "" ? 0 : parseInt(fivesValueStr);
    const sixesValue: number =
      sixesValueStr === "" ? 0 : parseInt(sixesValueStr);
    const threeOfAKindValue: number =
      threeOfAKindValueStr === "" ? 0 : parseInt(threeOfAKindValueStr);
    const fourOfAKindValue: number =
      fourOfAKindValueStr === "" ? 0 : parseInt(fourOfAKindValueStr);
    const chanceValue: number =
      chanceValueStr === "" ? 0 : parseInt(chanceValueStr);

    //read checkbox values
    const fullHouse: boolean = fullHouseRef.current?.checked || false;
    const smallStraight: boolean = smallStraightRef.current?.checked || false;
    const largeStraight: boolean = largeStraightRef.current?.checked || false;
    const yahtzee: boolean = yahtzeeRef.current?.checked || false;

    const inputValues: Inputs = {
      ones: onesValue,
      twos: twosValue,
      threes: threesValue,
      fours: foursValue,
      fives: fivesValue,
      sixes: sixesValue,
      threeOfAKind: threeOfAKindValue,
      fourOfAKind: fourOfAKindValue,
      fullHouse: fullHouse,
      smallStraight: smallStraight,
      largeStraight: largeStraight,
      yahtzee: yahtzee,
      chance: chanceValue,
    };

    return inputValues;
  };
  const validate = (inputValues: Inputs) => {
    const errors: Errors = {
      ones: false,
      twos: false,
      threes: false,
      fours: false,
      fives: false,
      sixes: false,
      ThreeOfAKind: false,
      FourOfAKind: false,
      Chance: false,
    };
    // validate ones
    const {
      ones,
      twos,
      threes,
      fours,
      fives,
      sixes,
      threeOfAKind,
      fourOfAKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yahtzee,
      chance,
    } = inputValues;
    if (upperIsInvalid(ones, 1)) {
      errors.ones = true;
    }
    if (upperIsInvalid(twos, 2)) {
      errors.twos = true;
    }
    if (upperIsInvalid(threes, 3)) {
      errors.threes = true;
    }
    if (upperIsInvalid(fours, 4)) {
      errors.fours = true;
    }
    if (upperIsInvalid(fives, 5)) {
      errors.fives = true;
    }
    if (upperIsInvalid(sixes, 6)) {
      errors.sixes = true;
    }
    //validate lower;

    if (isNaN(threeOfAKind) || (threeOfAKind < 0 && threeOfAKind > 30)) {
      errors.ThreeOfAKind = true;
    }
    if (isNaN(fourOfAKind) || (fourOfAKind < 0 && fourOfAKind > 30)) {
      errors.FourOfAKind = true;
    }
    if (isNaN(chance) || (chance < 0 && chance > 30)) {
      errors.Chance = true;
    }
    setErrors(errors);
    console.log(errors);
    return Object.values(errors).every((error) => !error);
  };

  const upperIsInvalid = (value: number, index: number): boolean => {
    return (
      isNaN(value) || value < 0 || value > 5 * index || value % index !== 0
    );
  };

  return (
    <Fragment>
      <span>
        <input type="text" name="name" autoComplete="off"></input>
      </span>
      <span>
        <input
          type="number"
          name="ones"
          step="1"
          min="0"
          max="5"
          ref={onesRef}
          onChange={handleChange}
          style={errors.ones ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>
        <input
          type="number"
          name="twos"
          step="2"
          min="0"
          max="10"
          ref={twosRef}
          onChange={handleChange}
          style={errors.twos ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>
        <input
          type="number"
          name="threes"
          step="3"
          min="0"
          max="15"
          ref={threesRef}
          onChange={handleChange}
          style={errors.threes ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>
        <input
          type="number"
          name="fours"
          step="4"
          min="0"
          max="20"
          ref={foursRef}
          onChange={handleChange}
          style={errors.fours ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>
        <input
          type="number"
          name="fives"
          step="5"
          min="0"
          max="25"
          ref={fivesRef}
          onChange={handleChange}
          style={errors.fives ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>
        <input
          type="number"
          name="sixes"
          step="6"
          min="0"
          max="30"
          ref={sixesRef}
          onChange={handleChange}
          style={errors.sixes ? {borderColor: "red"} : {}}
        ></input>
      </span>
      <span>{calculatedValues.totalUpper}</span>
      <span>{calculatedValues.bonus ? "Y" : "N"}</span>
      <span>{calculatedValues.totalUpperWithBonus}</span>
      <div></div>
      <span>
        <input
          type="number"
          ref={threeOfAKindRef}
          name="threeOfAKind"
          step="1"
          min="0"
          max="30"
          onChange={handleChange}
        ></input>
      </span>
      <span>
        <input
          type="number"
          ref={fourOfAKindRef}
          name="fourOfAKind"
          step="1"
          min="0"
          max="30"
          onChange={handleChange}
        ></input>
      </span>
      <span>
        <input
          type="checkbox"
          ref={fullHouseRef}
          name="fullHouse"
          onChange={handleChange}
          disabled={blocked.fullHouse}
        ></input>
        <span className={styles.blockWrapper}>
          <span>Blocked</span>
          <input
            type="checkbox"
            name="blockFullHouse"
            ref={blockFullHouseRef}
            onChange={handleBlock}
            className={styles.block}
            disabled={fullHouseRef.current?.checked || false}
          ></input>
        </span>
      </span>
      <span>
        <input
          type="checkbox"
          ref={smallStraightRef}
          name="smallStraight"
          onChange={handleChange}
          disabled={blocked.smallStraight}
        ></input>
        <span className={styles.blockWrapper}>
          <span>Blocked</span>
          <input
            type="checkbox"
            name="blockSmallStraight"
            ref={blockSmallStraightRef}
            onChange={handleBlock}
            className={styles.block}
            disabled={smallStraightRef.current?.checked || false}
          ></input>
        </span>
      </span>

      <span>
        <input
          type="checkbox"
          ref={largeStraightRef}
          name="largeStraight"
          onChange={handleChange}
          disabled={blocked.largeStraight}
        ></input>

        <span className={styles.blockWrapper}>
          <span>Blocked</span>
          <input
            type="checkbox"
            name="blockLargeStraight"
            ref={blockLargeStraightRef}
            onChange={handleBlock}
            className={styles.block}
            disabled={largeStraightRef.current?.checked || false}
          ></input>
        </span>
      </span>
      <span>
        <input
          type="checkbox"
          ref={yahtzeeRef}
          name="yahtzee"
          onChange={handleChange}
          disabled={blocked.yahtzee}
        ></input>
        <span className={styles.blockWrapper}>
          <span>Blocked</span>
          <input
            type="checkbox"
            name="blockYahtzee"
            ref={blockYahtzeeRef}
            onChange={handleBlock}
            className={styles.block}
            disabled={yahtzeeRef.current?.checked || false}
          ></input>
        </span>
      </span>
      <span>
        <input
          type="number"
          ref={chanceRef}
          name="chance"
          step="1"
          min="0"
          max="30"
          onChange={handleChange}
        ></input>
      </span>

      <span>{calculatedValues.totalLower}</span>
      <span>{calculatedValues.grandTotal}</span>
    </Fragment>
  );
}
