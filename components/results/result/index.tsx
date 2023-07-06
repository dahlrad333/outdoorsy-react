import { Result } from "../../../types/result";

type Props = {
    result: Result
}

export default function ResultComponent({
    result,
}: Props) {

  return (
    <div key={result.id} className="p-2 border-b border-gray-300">
        {result.attributes.name}
    </div> 
  );
}

