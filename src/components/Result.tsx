type Props =  {
    valueInput: string
}

export const Result = ({valueInput}:Props) => {
    return (
        <div className="w-52 h-10 bg-slate-200 border-2 border-solid border-slate-800">
        <p
          className={
            valueInput.length < 20
              ? "text-right text-xl relative top-0.5"
              : "text-right text-sm relative top-1.5"
          }
        >
          {valueInput}
        </p>
      </div>
    )
}