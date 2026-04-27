export default function QuizLibrary({ quizzes, selectQuiz, goToCreate, deleteQuiz }) {
    return (
        <div>
            <h1>Knihovna quizů</h1>

            <button onClick={goToCreate}>
                Nový quiz
            </button>

            {quizzes.length === 0 && (
                <p>Zatím tu nic není</p>
            )}

            {quizzes.map((q) => (
                <div key={q.id} style={{ marginTop: "10px" }}>
                    <h3>{q.title}</h3>

                    <button onClick={() => selectQuiz(q)}>
                        Spustit
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm("Opravdu chceš smazat tento quiz?")) {
                                deleteQuiz(q.id);
                            }
                        }}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Smazat
                    </button>
                </div>
            ))}
        </div>
    );
}