import ResultComponent from "./result";
import { Result } from "../../types/result";

type Props = {
    results: Result[],
    included: any[]
}

export default function ResultsComponent({
    results,
    included
}: Props) {


  return (
    <div>
        {results.map((result: any) => (
            <ResultComponent result={result} key={result.id} included={included}></ResultComponent>
        ))}
    </div>
  );
}