import React from "react";
import data from "../data/quizData";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const QuestionAdded = (props) => {
  const solvedData = props.data.filter((item) => item.givenBy === props.uid);
  return (
    <div>
      {solvedData.map((item, index) => (
        <Box key={index} sx={{ m: 2 }}>
          <Typography variant="h5" gutterBottom>
            {item.question}
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup aria-label="quiz" name="quiz">
              {item.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                color: "green",
              }}
            >
              Correct Option
            </FormLabel>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value={item.correctOption}
                control={<Radio />}
                label={item.correctOption}
                disabled
                sx={{
                  color: "green",
                }}
              />
            </RadioGroup>
          </FormControl>
          {item.explanation && (
            <Box sx={{ m: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {`Explanation: ${item.explanation}`}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};

export default QuestionAdded;
