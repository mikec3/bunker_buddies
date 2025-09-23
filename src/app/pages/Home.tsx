import { RequestInfo } from "rwsdk/worker";
import { Feed } from "@/app/components/Feed";
import { getQuestionsAndAnswers } from "@/app/components/functions";
import {Header} from "@/app/components/Header";

const Home = async ({ ctx }: RequestInfo) => {

    const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
  const todayMinusXDays = new Date(startOfToday);
  todayMinusXDays.setDate(todayMinusXDays.getDate()-5);

  let questionsAndAnswers = await getQuestionsAndAnswers( todayMinusXDays, startOfToday);

  console.log(questionsAndAnswers.data);
  console.log('logged in as: ' + ctx.user?.username);

  return (
    <div>
      <Header/>
      <Feed questionsAndAnswers={questionsAndAnswers.data}/>
    </div>
  );
}

export {Home}
