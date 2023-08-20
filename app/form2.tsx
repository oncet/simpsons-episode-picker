"use client";

import { useEffect, useState } from "react";

export default function Form({ myAction, data }: any) {
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState(data);

  console.log("data", data);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <form
        {...(ready && {
          action: async (formData) => {
            const response = await myAction(formData.get("query"));

            setResults(response);
          },
        })}
      >
        <input name="query" />
        <button>Search</button>
      </form>

      <div>
        <h2>Results</h2>
        <ul>
          {results.map((item: any) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
