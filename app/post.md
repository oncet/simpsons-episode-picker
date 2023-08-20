I have a page that uses an async function for data fetching. The async functions reads an URL search param called `query` to return the results:

```
async function getData(searchParams) {
  return ["foo", "bar", "baz"].filter((item) => item.includes(searchParams.query));
}

export default async function Page({ searchParams }) {
  const data = await getData(searchParams);

  return (
    <>
      <form>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Results</h2>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

Now I want to enhance it with some extra JavaScript, so I try adding a server action to the form:

```
export default async function Page({ searchParams }) {
  const data = await getData(searchParams);

  async function myAction(data) {
    "use server";

    const result = await getData(data.get("query"));

    return result;
  }

  return (
    <>
      <form action={myAction}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Results</h2>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

First thing I notice is that now it uses the `POST` method instead of `GET`. I tried slapping a `method='get'` to the form but it doesn't help.

Second thing I notice is that the response is not in JSON format, instead I get something like this:

```
0:["$@1",["development",null]]
1:["foo"]
```

Is not great but the data is there. Problem is I don't know how to read this data from the client.

Tried [custom invocation without startTransition](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-without-starttransition):

```
// app/page.jsx
export default async function Page({ searchParams }) {
  const data = await getData(searchParams.query);

  async function myAction(data) {
    "use server";

    const result = await getData(data.get("query"));

    return result;
  }

  return (
    <>
      <form>
        <input name="query" />
        <Button onClick={myAction} />
      </form>
      <div>
        <h2>Results</h2>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// button.jsx
export default function Button({ onClick }) {
  return (
    <button
      onClick={async () => {
        await onClick('foo');
      }}
    >
      Search
    </button>
  );
}
```

But I get this error:

```
Error: Event handlers cannot be passed to Client Component props.
  <button onClick={function} children=...>
```
