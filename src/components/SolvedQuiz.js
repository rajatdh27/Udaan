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

const SolvedQuiz = () => {
  const solvedData = data.filter((item) => item.solved === "yes");
  return (
    <div>
      {solvedData.map((item, index) => (
        <Box key={index} sx={{ m: 2 }}>
          <Typography variant="h5" gutterBottom>
            {item.question}
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">Correct Option</FormLabel>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value={item.correctOption}
                control={<Radio />}
                label={item.correctOption}
                disabled
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

export default SolvedQuiz;
