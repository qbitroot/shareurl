"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { URL_REGEXP } from "@/app/_regex";

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setError] = useState("");
  const [isCopied, setCopied] = useState(false);

  function handleInputUrl(e: ChangeEvent<HTMLInputElement>) {
    let inp = e.target.value.trim();
    if (
      !"http://".startsWith(inp) &&
      !"https://".startsWith(inp) &&
      !/[\/:]+/.test(inp)
    ) {
      inp = "https://" + inp;
    }
    setInputUrl(inp.trim());
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputUrl === "") return;

    const check = inputUrl.match(URL_REGEXP);
    setError(check ? "" : "Not a valid URL");
    if (!check) return;

    setInputUrl("");
    setLoading(true);
    fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url: inputUrl }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.shortCode) throw new Error("No short URL in response JSON");
        setShortUrl(`${location.origin}/${res.shortCode}`);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }

  return (
    <main className="max-w-screen-sm w-auto m-auto">
      {!shortUrl ? (
        <form onSubmit={handleSubmit}>
          <div className="tool-container">
            <input
              name="url"
              value={inputUrl}
              onChange={handleInputUrl}
              placeholder={isLoading ? "Loading..." : "https://example.com"}
              autoFocus
              className="tool-input text-sm"
              disabled={isLoading}
            ></input>
            <button type="submit" className="tool-btn">
              Shorten!
            </button>
          </div>
          {errorMsg && (
            <span
              className="autohide text-red-600"
              onAnimationEnd={() => setError("")}
            >
              {errorMsg}
            </span>
          )}
        </form>
      ) : (
        <>
          <a
            onClick={(e) => {
              e.preventDefault();
              setShortUrl("");
              setCopied(false);
            }}
            href="#"
            className="tool-link"
          >
            Go back
          </a>
          <div className="tool-container">
            <input
              value={shortUrl}
              autoFocus
              onFocus={(e) => e.target.select()}
              readOnly
              className="tool-input text-lg"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopied(true);
              }}
              className="tool-btn"
            >
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
