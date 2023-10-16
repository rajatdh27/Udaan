const quizObject = {
  question: "Polymorphism is",
  options: ["option1", "option2", "option3", "option4"],
  correctOption: "option1",
  subject: "C++",
  addedBy: "User1",
  explanation: "blah blah blah",
};

const QuizComponent = () => {
  return (
    <QuizComponent
      question={quizObject.question}
      options={quizObject.options}
      correctOption={quizObject.correctOption}
      subject={quizObject.subject}
      addedBy={quizObject.addedBy}
      explanation={quizObject.explanation}
    />
  );
};

export default QuizComponent;
