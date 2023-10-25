import { db } from "../src/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const questionCollectionRef = collection(db, "questions");

class QuestionService {
  addQuestion = (newQuestion) => {
    return addDoc(questionCollectionRef, newQuestion);
  };
  setData = (id, data) => {
    return setDoc(doc(db, "QuestionData", id), data);
  };
  updateQuestion = (id, updatedQuestion) => {
    const QuestionDoc = doc(db, "Questions", id);
    return updateDoc(QuestionDoc, updatedQuestion);
  };

  deleteQuestion = (id) => {
    const QuestionDoc = doc(db, "Questions", id);
    return deleteDoc(QuestionDoc);
  };

  getAllQuestions = () => {
    return getDocs(questionCollectionRef);
  };

  getQuestion = (id) => {
    const QuestionDoc = doc(db, "QuestionData", id);
    return getDoc(QuestionDoc);
  };
}

export default new QuestionService();
