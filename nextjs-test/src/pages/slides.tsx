import { useEffect, useState } from "react";

export default function SlidesPage() {
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/api/get-slides")
      .then((res) => res.json())
      .then((data) => setResult(JSON.stringify(data, null, 2)));
  }, []);

  return (
    <div>
      <p>
        Called ftml-backend <code>slides({`{ uri }`})</code> with{" "}
        <code>
          uri = http://mathhub.info?a=courses/FAU/GDI/course&p=course/slides/Folien/00_Organisatorisches&d=content&l=de&e=section
        </code>
      </p>
      <pre>{result}</pre>
    </div>
  );
}
