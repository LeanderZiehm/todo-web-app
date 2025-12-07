import { useEffect, useState } from "react";


// interface TextEntry {
//   id?: number;
//   timestamp?: string;
//   text?:string;
// }

export default function TextsView() {
  // const [entries, setEntries] = useState<TextEntry[]>([]);
  // const [form, setForm] = useState<TextEntry>({
  //   account_type: "bar",
  //   amount: 0,
  // });


  const [texts,setTexts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  console.log(API_URL);
  

  useEffect( () => {
    fetch(API_URL)
  } );


    function getAPI(){
    getAPI().then(() => console.log(smallData));
  }

  useEffect( () => {
      fetchTexts().then(result => {console.log(result);   setTexts(result.rows)}).catch(err => setError(err.message)).finally(setLoading(false));
  }, []); 



  async function fetchTexts() {
    const response = await fetch(`${API_URL}/getTexts/`);
    if (!response.ok) throw new Error("fetch texts failed");
    return response.json();
    //const x = JSON.stringify(res);
    //console.log(x);
   // return x;
    // setEntries(res.data);
  }

  // useEffect(() => { fetchEntries(); }, []);

  // async function addEntry() {
  //   await axios.post(`${API}/money`, form);
  //   setForm({ account_type: "bar", amount: 0 });
  //   fetchEntries();
  // }

  // fetchEntries()

  return (
    <>
    <p>{texts.map((t) => <li id={t.id} > {t.text} </li> )}</p>
    <p>{JSON.stringify(texts)}</p>
    </>
  );
}
