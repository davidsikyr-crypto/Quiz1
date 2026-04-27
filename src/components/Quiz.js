import React, { useState, useEffect } from "react";
import Question from "./Question";
import CreateQuiz from "./CreateQuiz";
import QuizLibrary from "./QuizLibrary";

function Quiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [view, setView] = useState("library");

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes(saved);
    }, []);

    const saveQuiz = (quiz) => {
        const updated = [...quizzes, quiz];
        setQuizzes(updated);
        localStorage.setItem("quizzes", JSON.stringify(updated));
    };

    const deleteQuiz = (id) => {
        const updated = quizzes.filter((q) => q.id !== id);
        setQuizzes(updated);
        localStorage.setItem("quizzes", JSON.stringify(updated));
    };

    const handleAnswer = (option) => {
        const isCorrect = option === selectedQuiz.questions[current].answer;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setScore(newScore);
        }

        const next = current + 1;

        if (next < selectedQuiz.questions.length) {
            setCurrent(next);
        } else {
            alert(`Skóre: ${newScore}/${selectedQuiz.questions.length}`);
            setView("library");
            setCurrent(0);
            setScore(0);
        }
    };

    if (view === "create") {
        return (
            <CreateQuiz
                saveQuiz={saveQuiz}
                goToLibrary={() => setView("library")}
            />
        );
    }

    if (view === "play") {
        return (
            <div>
                <h1>{selectedQuiz.title}</h1>
                <Question
                    data={selectedQuiz.questions[current]}
                    onAnswer={handleAnswer}
                />
            </div>
        );
    }

    return (
        <QuizLibrary
            quizzes={quizzes}
            selectQuiz={(q) => {
                setSelectedQuiz(q);
                setView("play");
            }}
            goToCreate={() => setView("create")}
            deleteQuiz={deleteQuiz}
        />
    );
}

export default Quiz;
