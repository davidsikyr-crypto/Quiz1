import React, { useState } from "react";


export default function CreateQuiz({ saveQuiz, goToLibrary}) {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");
    const [list, setList] = useState([]);


    const addQuestion = () => {
        if (!question || !answer) return;

        const newQ = { question, options, answer };
        setList([...list, newQ]);

        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
    };

    const handleOptionChange = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSave = () => {
        if (!title || list.length === 0) return;

        const newQuiz = {
            id: Date.now(),
            title,
            questions: list
        };
        saveQuiz(newQuiz);
        goToLibrary();
    };


    return (
        <div>
            <h1>Vytvoř Quiz</h1>

            <input
                placeholder="Název quizu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Otázka"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <br />

            {options.map((opt, i) => (
                <div key={i}>
                    <input
                        placeholder={`Možnost ${i + 1}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(e.target.value, i)}
                    />
                </div>
            ))}

            <br />

            <input
                placeholder="Správná odpověď"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <br /><br />

            <button onClick={addQuestion}>Přidat otázku

            </button>

            <h3>Počet otázek: {list.length}</h3>

            <button onClick={handleSave}>Uložit quiz</button>

        </div>

    );
}
