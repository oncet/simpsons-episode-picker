"use client";

export default function Button({ onClick }: { onClick: any }) {
  return (
    <button
      onClick={async (event) => {
        event.preventDefault();

        const results = await onClick("foo");

        console.log("results", results);
      }}
    >
      Search
    </button>
  );
}
