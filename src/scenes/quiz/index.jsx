import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Slider,
} from "@mui/material";
import { useState } from "react";

const QuizComponent = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === question.correctOption);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#808080",
        width: "400px",
        height: "auto",
        fontSize: "20px",
        transition: "all 0.3s",
        margin: "20px",
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
            sx={{ margin: "10px", fontSize: "20px" }}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
        <br />
        {isCorrect && (
          <Typography variant="h7" sx={{ color: "#03719C", fontSize: "24px" }}>
            Correct! {question.explanation}
          </Typography>
        )}
        {!isCorrect && selectedOption && (
          <Typography variant="h7" sx={{ color: "#AB2C38", fontSize: "24px" }}>
            Incorrect. The correct answer is {question.correctOption}.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const Quiz = () => {
  const questions = [
    {
      question: "Polymorphism is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option1",
      subject: "C++",
      addedBy: "User1",
      explanation: "blah blah blah",
    },
    {
      question: "Inheritance is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option2",
      subject: "C++",
      addedBy: "User2",
      explanation: "blah blah blah",
    },
    {
      question: "Encapsulation is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option3",
      subject: "C++",
      addedBy: "User3",
      explanation: "blah blah blahblah",
    },
    {
      question: "Inheritance is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option2",
      subject: "C++",
      addedBy: "User2",
      explanation: "blah blah blah",
    },
    {
      question: "Inheritance is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option2",
      subject: "C++",
      addedBy: "User2",
      explanation: "blah blah blah",
    },
    {
      question: "Inheritance is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option2",
      subject: "C++",
      addedBy: "User2",
      explanation: "blah blah blah",
    },
    {
      question: "Inheritance is",
      options: ["option1", "option2", "option3", "option4"],
      correctOption: "option2",
      subject: "C++",
      addedBy: "User2",
      explanation: "blah blah blah",
    },
    // Add more questions here, up to a total of 10
  ];

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      m="30px"
      flexWrap="wrap"
      paddingBottom={20}
      sx={{
        position: "fixed",
        height: "100%",
        overflowY: "scroll",
        scrollbarWidth: "10px",
      }}
    >
      {questions.map((questionObject) => {
        return <QuizComponent question={questionObject} />;
      })}
    </Box>
  );
};

export default Quiz;
