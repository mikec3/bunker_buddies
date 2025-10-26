import { RequestInfo } from "rwsdk/worker";
import { Feed } from "@/app/components/Feed";
import {getQuestionsAndAnswers, getInboundConnReq, getOutboundConnReq, getAllConn} from "@/app/components/functions";
import {Header} from "@/app/components/Header";

const Home = async ({ ctx }: RequestInfo) => {

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
  const todayMinusXDays = new Date(startOfToday);
  todayMinusXDays.setDate(todayMinusXDays.getDate()-10);

  let questionsAndAnswers = await getQuestionsAndAnswers( todayMinusXDays, startOfToday);

  let inboundConnReq = await getInboundConnReq();

  let outboundConnReq = await getOutboundConnReq();

  let allConn = await getAllConn();

  console.log(questionsAndAnswers.data);
  console.log('logged in as: ' + ctx.user?.username);
  //console.log('inbound Conn Requests' + JSON.stringify(inboundConnReq.data[0].requester.username));

  return (
    <div>
      <Header inboundConnReq={inboundConnReq.data} 
              outboundConnReq={outboundConnReq.data}
              user={ctx.user}
              allConn={allConn.data} 
      />
     { <Feed questionsAndAnswers={questionsAndAnswers.data}
            user = {ctx.user}/>
            }
    </div>
  );
}

export {Home}
