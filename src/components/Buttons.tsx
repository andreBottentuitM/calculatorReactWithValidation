import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
const keys: (string | number)[] = [
    1,
    2,
    3,
    "+",
    4,
    5,
    6,
    "-",
    7,
    8,
    9,
    "÷",
    0,
    ",",
    "=",
    "x",
  ];

  type Props = {
    onClickClean: React.MouseEventHandler<HTMLButtonElement>;
    onClickCalculate: React.MouseEventHandler<HTMLButtonElement>;
    onClickBackspace: React.MouseEventHandler<HTMLButtonElement>
  }

export const Buttons = ({onClickCalculate, onClickClean, onClickBackspace}: Props) => {
    return (
        <div>
        <div className="flex justify-between items-baseline">
        <button onClick={onClickClean} className="text-right font-bold mt-2.5 text-xl">
          Clean
        </button>
        <button onClick={onClickBackspace}><FontAwesomeIcon className="relative top-px text-xl" icon={solid("backspace")}/></button>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-5 text-4xl font-mono items-center">
          {keys.map((item, key) => (
            <button
              onClick={onClickCalculate}
              value={item}
              className="bg-slate-200 ease-linear hover:bg-slate-300 shadow-sm shadow-black rounded"
              key={key}
            >
              {item}
            </button>
          ))}
        </div>
        </div>
    )
}