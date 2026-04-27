export default function Question({ data, onAnswer }) {
    return (
        <div>
            <h2>{data.question}</h2>

            {data.options.map((opt, i) => (
                <button key={i} onClick={() => onAnswer(opt)}>
                    {opt}
                </button>
            ))}
        </div>
    );
}