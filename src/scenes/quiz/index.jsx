import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import data from "../../data/quizData";

const QuizComponent = ({
  question,
  onOptionSelect,
  isCorrect,
  selectedOption,
  onNext,
  onPrev,
  onSubmit,
  currentQuestionIndex,
  totalQuestions,
  totalCorrect,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        backgroundColor: "#808080",
        minWidth: "40%",
        minHeight: "30%",
        maxHeight: "80%",
        fontSize: "20px",
        transition: "all 0.3s",
        margin: "20px",
        overflowY: "scroll",
      }}
    >
      <CardContent>
        <Typography variant="h4" fontSize={24} gutterBottom>
          {question.question}
        </Typography>
      </CardContent>
      <CardContent>
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              margin: "10px",
              padding: "10px",
              minWidth: "200px",
              fontSize: "20px",
              backgroundColor:
                selectedOption === option ? "#940B92" : undefined,
            }}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={onPrev}
            sx={{
              margin: "10px",
              fontSize: "20px",
              backgroundColor: "#9D4DFF",
            }}
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </Button>
          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button
              variant="contained"
              onClick={onNext}
              sx={{
                margin: "10px",
                fontSize: "20px",
                backgroundColor: "#9D4DFF",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onSubmit}
              sx={{
                margin: "10px",
                fontSize: "20px",
                backgroundColor: "#C70039",
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const Quiz = (props) => {
  let questions = props.ques || data;
  const arr = [props.ques];

  console.log(arr, "tell", data, "helll", questions, "mell");
  // if (props.data.questions.length > 0) {
  //   console.log(props.data.questions);
  //   questions = props.data.questions;
  // }
  const [numberOfQuestions, setNumberOfQuestions] = useState(questions.length); // Default number of questions
  const [topic, setTopic] = useState(""); // Default topic
  const [filteredQuestions, setFilteredQuestion] = useState([]);

  useEffect(() => {
    setFilteredQuestion(
      questions.slice(0, numberOfQuestions).filter(
        (question) =>
          // question.topic.includes(topic) ||
          //   question.options.some((option) => option.includes())
          question
      )
    );
  }, [numberOfQuestions, topic, questions]);
  console.log(filteredQuestions, filteredQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAns, setCorrect] = useState([]);
  const [inCorrectAns, setInCorrect] = useState([]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctOption) {
      setIsCorrect(true);
      setTotalCorrect(totalCorrect + 1);
      setCorrect((questions) => {
        return [...questions, currentQuestion];
      });
    } else {
      setIsCorrect(false);
      setInCorrect((questions) => {
        return [...questions, currentQuestion];
      });
    }
  };

  const handleNext = () => {
    setSelectedOption("");
    setIsCorrect(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    setSelectedOption("");
    setIsCorrect(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const handleSubmit = () => {
    const correct = [];
    const incorrect = [];

    correctAns.forEach((question, index) => {
      correct.push(
        <>
          <Typography
            key={index}
            variant="h4"
            sx={{ color: "#F44336", fontSize: "24px" }}
          >
            {question.question}
          </Typography>
          <Typography
            key={index}
            variant="body1"
            sx={{ color: "#4CAF50", fontSize: "20px" }}
          >
            Correct Answers: {question.correctOption}
          </Typography>
        </>
      );
    });
    inCorrectAns.forEach((question, index) => {
      incorrect.push(
        <>
          <Typography
            key={index}
            variant="h4"
            sx={{ color: "#F44336", fontSize: "24px" }}
          >
            {question.question}
          </Typography>
          <Typography
            key={index}
            variant="body1"
            sx={{ color: "#4CAF50", fontSize: "20px" }}
          >
            Correct Answers: {question.correctOption}
          </Typography>
        </>
      );
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="30px"
      >
        <Typography variant="h2" gutterBottom>
          Quiz Results
        </Typography>
        <Box m={2}>
          <Card sx={{ padding: "20px", backgroundColor: "#000" }}>
            <CardContent>
              <Typography variant="h3" gutterBottom sx={{ color: "#ffffff" }}>
                Correct Answers
              </Typography>
              {correctAnswers}
            </CardContent>
          </Card>
        </Box>
        <Box m={2}>
          <Card sx={{ padding: "20px", backgroundColor: "#000" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "#ffffff" }}>
                Incorrect Answers
              </Typography>
              {incorrectAnswers}
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" m="30px">
      <Box display="flex" justifyContent="center" m="10px">
        <Box sx={{ margin: "5px" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", marginRight: "10px" }}
          >
            Select number of questions:
          </Typography>
          <select
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
          >
            {questions.map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </Box>
        <Box sx={{ margin: "5px" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", marginRight: "10px" }}
          >
            Filter by topic:
          </Typography>
          <input
            type="text"
            placeholder="Enter topic"
            onChange={(e) => setTopic(e.target.value)}
            style={{ padding: "5px", fontSize: "16px" }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        m="30px"
        flexWrap="wrap"
        paddingBottom={20}
        sx={{
          height: "80%",
        }}
      >
        {currentQuestion && (
          <QuizComponent
            question={currentQuestion}
            onOptionSelect={handleOptionSelect}
            isCorrect={isCorrect}
            selectedOption={selectedOption}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={filteredQuestions.length}
            totalCorrect={totalCorrect}
          />
        )}
      </Box>
    </Box>
  );
};

export default Quiz;
