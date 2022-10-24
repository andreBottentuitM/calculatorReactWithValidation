import "./App.css";
import { useState } from "react";
import { Buttons } from "./components/Buttons";
import { Result } from "./components/Result";

const App = () => {
  const [valueInput, setState] = useState<string>("0");
  const [valueComma, setComma] = useState(true);

  const calculate = (e: any) => {
    let valueInputClone: string | number = valueInput;
    let key = e.target.innerHTML;
    const regexNumber = /\d/;
    const regexSpecialCharacteres = /[÷x+=-]/;
    const regexComma = /[,]/;
    let numberOfCommas = valueInputClone
      .split("")
      .filter((item) => item === ",");
    let numberOfCaracters = valueInputClone
      .split("")
      .filter((item) => regexSpecialCharacteres.test(item));


      //Validation about replace first zero
    if (
      valueInputClone[0] === "0" &&
      key !== "," &&
      valueInputClone[1] !== "," &&
      !regexSpecialCharacteres.test(valueInputClone[1]) &&
      !regexSpecialCharacteres.test(key)
    ) {
      valueInputClone = valueInputClone.replace(`${valueInputClone[0]}`, "");
    }

    if (valueInputClone.length <= 26) {

      //Validation about comma
      if (
        (key === "," &&
          !valueInputClone.includes(",") &&
          !regexSpecialCharacteres.test(valueInputClone[valueInputClone.length - 1]) &&
          valueComma === true) ||
        (valueComma === true &&
          key === "," &&
          regexSpecialCharacteres.test(valueInputClone) &&
          !regexSpecialCharacteres.test(valueInputClone[valueInputClone.length - 1]) &&
          numberOfCommas.length < 2 &&
          !regexComma.test(valueInputClone[valueInputClone.length - 1]))
      ) {
        valueInputClone += key;
        setComma(false);
      } 
      //Validation about numbers and special characteres
      else if (
        ((!regexSpecialCharacteres.test(valueInputClone) ||
        regexSpecialCharacteres.test(valueInputClone[0])) &&
          regexNumber.test(valueInputClone[valueInputClone.length - 1]) &&
          numberOfCaracters.length < 2 &&
          key !== ",") ||
        valueInputClone === ""
      ) {
        if (valueInputClone[0] !== "-") {
          setComma(true);
        } else if (regexSpecialCharacteres.test(key)) {
          setComma(true);
        }
        valueInputClone += key;
      } 
      else if (
        regexNumber.test(key) &&
        key !== "," &&
        !regexSpecialCharacteres.test(key)
      ) {
        valueInputClone += key;
      } 
      //validation about replace special characters for others special characters
      else if (
        !regexNumber.test(valueInputClone[valueInputClone.length - 1]) &&
        key !== "," &&
        !regexComma.test(valueInputClone[valueInputClone.length - 1])
      ) {
        if (regexSpecialCharacteres.test(valueInputClone[0])) {
          let firstOperator = valueInputClone[0];
          let deletingFirstIndex = valueInputClone.split("");
          deletingFirstIndex.shift();
          let result = deletingFirstIndex
            .join("")
            .replace(valueInputClone[valueInputClone.length - 1], `${key}`);
            valueInputClone = firstOperator.concat(result);
        } else {
          valueInputClone = valueInputClone.replace(
            valueInputClone[valueInputClone.length - 1],
            `${key}`
          );
        }
      }
    }
    if (key !== "=") {
      setState(valueInputClone);
    } else {
      let converterComma = valueInputClone.replace(/[,]/g, ".");
      let converterDivision = converterComma.replace(/[÷]/g, "/")
      let converterMultiplie = converterDivision.replace(/[x]/g, "*")
      let resultFinal = eval(converterMultiplie).toString();

      //Error Handling about division by zero
      if(resultFinal === 'Infinity' || resultFinal === '-Infinity'){
        setState('Não é possível dividir por zero')
      }else{
        setState(resultFinal.replace(".", ","));
      }
      if (resultFinal[0] !== "-") {
        setComma(true);
      }
    }
  };

  const backspace = () => {
    let valueInputClone = valueInput;
    let result = valueInputClone.split("");
    result.pop();
    if (result.join("") === "") {
      setState(result.join("").replace(`${result}`, "0"));
    } else {
      setState(result.join(""));
      
    }
  };

  const clean = () => {
    setState("0");
    setComma(true);
  };

  return (
    <div className="bg-slate-800 h-screen text-slate-800">
      <div className="relative shadow-md shadow-black border border-solid border-black top-24 w-64 h-80 bg-slate-400 mx-auto px-6 py-6 margin rounded">
        <Result valueInput={valueInput} />
        <Buttons
          onClickCalculate={calculate}
          onClickClean={clean}
          onClickBackspace={backspace}
        />
      </div>
    </div>
  );
};

export default App;
