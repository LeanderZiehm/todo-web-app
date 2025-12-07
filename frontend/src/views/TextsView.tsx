import { useEffect, useState } from "react";
import { fetchTexts } from "../services/api";

export default function TextsView() {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTexts()
      .then((result) => {
        console.log(result);
        setTexts(result.rows);
      })
      .catch((err) => setError(err.message))
      .finally(setLoading(false)); //todo make a vscode extension that looks for errors and suggests fixes for them automatically and asks for accept or not
  }, []);

  return (
    <>
      <p>
        {texts.map((t) => (
          <li id={t.id}> {t.text} </li>
        ))}
      </p>
      <p>{JSON.stringify(texts)}</p>
    </>
  );
}
