import { useEffect, useState } from "react";
import { Result } from "../../../types/result";
import { find } from 'lodash-es'

type Props = {
    result: Result
    included: any[]
}

export default function ResultComponent({
    result,
    included
}: Props) {

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const primaryImage = find(included, i => i.id === result.relationships.primary_image.data.id);
    if (primaryImage) {
      setImageUrl(primaryImage.attributes.url);
    }
  }, [result, included]);

  return (
    <div key={result.id} className="flex px-2 py-8 border-b border-gray-300">
        <div>
            <img src={imageUrl} alt="Primary Image" className="w-[210px] h-[140px] mr-4 rounded-lg " />
        </div>
        <div>
            <h3 className="text-xl font-bold">{result.attributes.name}</h3>
        </div>
    </div>
  );
}

