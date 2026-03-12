import { useEffect, useState } from "react";
import { searchDocs, DocumentUri, SearchResult } from "@flexiformal/ftml-backend";

export default function SearchTest() {
  const [results, setResults] = useState<[number, SearchResult][]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("course");
  const [docUri, setDocUri] = useState(
    "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en"
  );
  const [numResults, setNumResults] = useState(50);

  async function runSearch(q: string, uri: string, num: number) {
    setLoading(true);

    const docs: DocumentUri[] = [uri];

    const res = await searchDocs(q, docs, num);

    if (res) {
      setResults(res);
    }

    setLoading(false);
  }

  useEffect(() => {
    runSearch(query, docUri, numResults);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Search Docs Test</h1>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label><b>Search Query:</b></label><br />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 400 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label><b>Document URI:</b></label><br />
          <input
            type="text"
            value={docUri}
            onChange={(e) => setDocUri(e.target.value)}
            style={{ width: 600 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label><b>Number of Results:</b></label><br />
          <input
            type="number"
            value={numResults}
            onChange={(e) => setNumResults(Number(e.target.value))}
          />
        </div>

        <button onClick={() => runSearch(query, docUri, numResults)}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {results.map(([score, result], index) => (
        <div
          key={index}
          style={{
            marginBottom: 12,
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <p><b>Score:</b> {score}</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}