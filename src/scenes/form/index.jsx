import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";

const Form = (props) => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    const question = {
      question: values.question.toLowerCase(),
      options: [
        values.option1.toLowerCase(),
        values.option2.toLowerCase(),
        values.option3.toLowerCase(),
        values.option4.toLowerCase(),
      ],
      correctOption: values.correctAnswer.toLowerCase(),
      solved: "no",
      userId: [],
      givenBy: props.uid,
    };
    try {
      addDoc(collection(db, `questions/`), question);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(question);
  };

  return (
    <Box m="20px">
      <Header title="QUESTION" subtitle="Add new questions here" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Question"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.question}
                name="question"
                error={!!touched.question && !!errors.question}
                helperText={touched.question && errors.question}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Option 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.option1}
                name="option1"
                error={!!touched.option1 && !!errors.option1}
                helperText={touched.option1 && errors.option1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Option 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.option2}
                name="option2"
                error={!!touched.option2 && !!errors.option2}
                helperText={touched.option2 && errors.option2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Option 3"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.option3}
                name="option3"
                error={!!touched.option3 && !!errors.option3}
                helperText={touched.option3 && errors.option3}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Option 4"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.option4}
                name="option4"
                error={!!touched.option4 && !!errors.option4}
                helperText={touched.option4 && errors.option4}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subject"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subject}
                name="subject"
                error={!!touched.subject && !!errors.subject}
                helperText={touched.subject && errors.subject}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="correctAnswer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correctAnswer}
                name="correctAnswer"
                error={!!touched.correctAnswer && !!errors.correctAnswer}
                helperText={touched.correctAnswer && errors.correctAnswer}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Question
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  question: yup.string().required("required"),
  option1: yup.string().required("required"),
  option2: yup.string().required("required"),
  option3: yup.string().required("required"),
  option4: yup.string().required("required"),
  subject: yup.string().required("required"),
  correctAnswer: yup.string().required("required"),
});
const initialValues = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  subject: "",
  correctAnswer: "",
};

export default Form;
