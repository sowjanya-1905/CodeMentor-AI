import { useState } from "react";
import "./App.css";
alert("Ask AI Clicked");

function App() {

const questions = [
{
question:"Which language is mostly used for AI and Data Science?",
options:["Java","Python","C++"],
answer:"Python"
},
{
question:"Which library is used for Data Analysis in Python?",
options:["React","Pandas","HTML"],
answer:"Pandas"
},
{
question:"Machine Learning is a part of?",
options:["Artificial Intelligence","Web Design","Networking"],
answer:"Artificial Intelligence"
},
{
question:"Which keyword is used to create a function in Python?",
options:["function","def","class"],
answer:"def"
},
{
question:"Which data structure follows FIFO?",
options:["Stack","Queue","Tree"],
answer:"Queue"
},
{
question:"Binary Search time complexity?",
options:["O(n)","O(log n)","O(n²)"],
answer:"O(log n)"
},
{
question:"Which algorithm finds shortest path?",
options:["Bubble Sort","Dijkstra Algorithm","Linear Search"],
answer:"Dijkstra Algorithm"
},
{
question:"Overfitting means?",
options:[
"Model learns training data too much",
"Deleting data",
"Syntax error"
],
answer:"Model learns training data too much"
},
{
question:"Dimensionality reduction technique?",
options:["PCA","Sorting","Loop"],
answer:"PCA"
},
{
question:"Transformer models are mainly used in?",
options:[
"Natural Language Processing",
"Networking",
"Operating Systems"
],
answer:"Natural Language Processing"
}
];


// LOGIN STATES

const [isLogin,setIsLogin]=useState(
localStorage.getItem("login")==="true"
);


const [user,setUser]=useState({
name:"",
email:"",
password:""
});


const [loginData,setLoginData]=useState({
email:"",
password:""
});


const [currentUser,setCurrentUser]=useState(
localStorage.getItem("username") || ""
);



// QUIZ STATES

const [currentQuestion,setCurrentQuestion]=useState(0);

const [score,setScore]=useState(0);

const [finished,setFinished]=useState(false);

const [message,setMessage]=useState("");



// AI CHAT STATES

const [userQuestion,setUserQuestion]=useState("");

const [codeInput,setCodeInput]=useState("");

const [chatHistory,setChatHistory]=useState([]);



// CERTIFICATE STATE

const [certificate,setCertificate] = useState(false);
const openCertificate = () => {
  setCertificate(true);
};



// REGISTER

const register=()=>{

localStorage.setItem(
"registeredUser",
JSON.stringify(user)
);

alert("Registration Successful!");

};



// LOGIN

const handleLogin=()=>{

const savedUser=
JSON.parse(localStorage.getItem("registeredUser"));


if(
savedUser &&
loginData.email===savedUser.email &&
loginData.password===savedUser.password
){

localStorage.setItem("login","true");

localStorage.setItem(
"username",
savedUser.name
);

setCurrentUser(savedUser.name);

setIsLogin(true);

}

else{

alert("Invalid Email or Password");

}

};



// LOGOUT

const logout=()=>{

localStorage.removeItem("login");

setIsLogin(false);

};



// QUIZ ANSWER

const checkAnswer=(option)=>{


if(option===questions[currentQuestion].answer){

setScore(score+1);

setMessage("✅ Correct Answer!");

}

else{

setMessage(
"❌ Wrong Answer. Correct Answer: "+
questions[currentQuestion].answer
);

}

};



// NEXT QUESTION

const nextQuestion=()=>{

if(currentQuestion < questions.length-1){

setCurrentQuestion(currentQuestion+1);

setMessage("");

}

else{

setFinished(true);

}

};



// CERTIFICATE GENERATION

const generateCertificate=()=>{

setCertificate(true);

setTimeout(()=>{

window.print();

},500);

};



// AI ASK FUNCTION

const askAI = () => {

  const q = userQuestion.toLowerCase();

  let answer = "";

  if (codeInput.trim() !== "") {
    answer =
      "Code Explanation:\n\n" +
      "1. Check variables and functions.\n" +
      "2. Check loops and conditions.\n" +
      "3. Fix syntax errors.\n" +
      "4. Test your code with different inputs.";
  }

  else if (q.includes("python")) {
    answer = "Python is a high-level programming language used for AI, Data Science, Web Development and Automation.";
  }

  else if (q.includes("sql")) {
    answer = "SQL is used to manage and retrieve data from databases.";
  }

  else if (q.includes("pandas")) {
    answer = "Pandas is a Python library used for data analysis.";
  }

  else if (q.includes("numpy")) {
    answer = "NumPy is used for numerical computing.";
  }

  else if (q.includes("machine learning")) {
    answer = "Machine Learning enables computers to learn patterns from data.";
  }

  else if (q.includes("react")) {
    answer = "React is a JavaScript library used for building user interfaces.";
  }

  else {
    answer = "I can answer questions about Python, SQL, Pandas, NumPy, React and Machine Learning.";
  }

  setChatHistory([
    ...chatHistory,
    {
      user: userQuestion || "Code Explanation",
      ai: answer,
    },
  ]);

  setUserQuestion("");
  setCodeInput("");
};
return (

<>

{

!isLogin ? (

<div className="login-box">

<h1>CodeMentor AI</h1>

<h2>Student Login</h2>


<input
placeholder="Name"
value={user.name}
onChange={(e)=>
setUser({
...user,
name:e.target.value
})
}
/>


<input
placeholder="Email"
value={user.email}
onChange={(e)=>{

setUser({
...user,
email:e.target.value
});

setLoginData({
...loginData,
email:e.target.value
});

}}
/>


<input
type="password"
placeholder="Password"
value={user.password}
onChange={(e)=>{

setUser({
...user,
password:e.target.value
});

setLoginData({
...loginData,
password:e.target.value
});

}}
/>


<button onClick={register}>
Register
</button>


<button onClick={handleLogin}>
Login
</button>


</div>


)

:


(


<>


<nav className="navbar">

<h2>
CodeMentor AI
</h2>


<div className="menu">

<a href="#home">Home</a>

<a href="#quiz">Quiz</a>

<a href="#dashboard">Dashboard</a>

<button onClick={openCertificate}>
Certificate 🏆
</button>
<a href="#about">About</a>


<button onClick={logout}>
Logout
</button>


</div>


</nav>




<div className="container" id="home">


<h1>
CodeMentor AI
</h1>


<h2>
Your Multilingual AI Coding Tutor
</h2>


<h3>
Welcome {currentUser} 🎉
</h3>


<p>
Learn Programming in Telugu & English with AI.
</p>


<button>
Get Started
</button>


</div>





<div className="section" id="quiz">


<h2>
Advanced Quiz Section 🧠
</h2>



{

finished ?


<div className="quiz-box">


<h2>
🎉 Quiz Completed
</h2>


<h3>
Your Score : {score}/10
</h3>


<button
onClick={generateCertificate}
>
Generate Certificate 🏆
</button>


<button

onClick={()=>{

setCurrentQuestion(0);
setScore(0);
setFinished(false);
setMessage("");

}}

>

Restart Quiz

</button>


</div>


:


<div className="quiz-box">


<h3>
Question {currentQuestion+1}/10
</h3>


<p>
{questions[currentQuestion].question}
</p>



{

questions[currentQuestion].options.map(
(option,index)=>(


<button
key={index}
onClick={()=>checkAnswer(option)}
>

{option}

</button>


)

)

}



<h3>
{message}
</h3>


<button onClick={nextQuestion}>
Next Question
</button>


</div>


}


</div>







<div className="section" id="dashboard">


<div className="dashboard">


<h2>
Student Dashboard 📊
</h2>


<h3>
👤 Name : {currentUser}
</h3>


<h3>
🏆 Score : {score}/10
</h3>


<h3>
📈 Progress :
{Math.round((score/10)*100)}%
</h3>


<h3>
📚 Skills Learned
</h3>


<p>
Python | SQL | Pandas | NumPy | Machine Learning | React | AI
</p>



</div>


</div>







<div className="section">


<h2>
AI Coding Tutor 🤖
</h2>



<div className="chat-box">


{

chatHistory.map((chat,index)=>(

<div key={index}>

<p>
👤 You : {chat.user}
</p>


<p>
🤖 AI : {chat.ai}
</p>

<hr/>

</div>

))

}



<h3>
Paste Your Code Here 👇
</h3>


<textarea

placeholder="Paste Python / Java / SQL code..."

value={codeInput}

onChange={(e)=>
setCodeInput(e.target.value)
}

/>



<input

placeholder="Ask your coding doubt..."

value={userQuestion}

onChange={(e)=>
setUserQuestion(e.target.value)
}

/>


<button onClick={askAI}>
Ask AI
</button>


</div>


</div>







{

certificate &&


<div className="section" id="certificate">


<div className="certificate">


<h1>
🏆 Certificate of Completion
</h1>


<h2>
CodeMentor AI
</h2>


<p>
This certificate is proudly presented to
</p>


<h2>
{currentUser}
</h2>


<p>
For successfully completing the AI Coding Quiz
</p>


<h3>
Score : {score}/10
</h3>


<p>
Skills:
Python | SQL | Pandas | NumPy | Machine Learning
</p>


<h3>
🎉 Congratulations 🎉
</h3>

<p>
Certificate ID: CMAI-2026-001
</p>

<p>
Date: {new Date().toLocaleDateString()}
</p>

 <div className="signature">
  <div>
    ___________________<br />
    Instructor
  </div>

  <div>
    ___________________<br />
    CodeMentor AI
  </div>
</div>

</div>


</div>


}






<div className="section" id="about">


<h2>
About CodeMentor AI
</h2>


<p>

CodeMentor AI helps students learn programming
in Telugu and English using Artificial Intelligence.

</p>


</div>



</>


)

}


</>

);


}


export default App;