import { RequestInfo } from "rwsdk/worker";
import { Feed } from "@/app/components/Feed";
import { getQuestionsAndAnswers } from "@/app/components/functions";

const Home = async ({ ctx }: RequestInfo) => {

    const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
  const todayMinusXDays = new Date(startOfToday);
  todayMinusXDays.setDate(todayMinusXDays.getDate()-5);

  let questionsAndAnswers = await getQuestionsAndAnswers( todayMinusXDays, startOfToday);

  console.log(questionsAndAnswers.data);

  return (
    <div>
      <p>
        {ctx.user?.username
          ? `You are logged in as user ${ctx.user.username}`
          : "You are not logged in"}
      </p>
      <Feed questionsAndAnswers={questionsAndAnswers.data}/>
    </div>
  );
}

export {Home}
