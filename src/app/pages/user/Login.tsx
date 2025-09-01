
import { LoginCard } from "@/app/components/LoginCard";
import { db } from "@/db";

const Login = async () => {

  // placeholder question text will get overwritten by db response
  let questionText = "Get in loser we're riding out the apocolypse";

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)

  // get today's question
 const question = await db.question.findUnique({
  where:{
    dateKey: startOfToday
  }
 });

 // if today's question text was found, replace the placeholder
  if (question?.question != null) {
    questionText = question.question;
  }
  

  return (
    <div>
      <LoginCard questionText={questionText}/>
    </div>
  )
}

export {Login};