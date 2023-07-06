import Result from "./result";

type Props = {
    results: any[]
}

export default function ResultsComponent({
    results,
}: Props) {


  return (
    <div className="">
        {results.map((result: any) => (
            <Result result={result} key={result.id}></Result>
        ))}
    </div>
  );
}