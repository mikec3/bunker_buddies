import { db } from "@/db";

const Feed = async () => {

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
  const todayMinusXDays = new Date(startOfToday);
  todayMinusXDays.setDate(todayMinusXDays.getDate()-5);

  console.log(todayMinusXDays);
  console.log(startOfToday);
  
  const question = await db.question.findMany({
    where: {
        dateKey: {
            gte: todayMinusXDays,
            lte: startOfToday
        }
    }
  });

  return (
    <div>
      <pre>{JSON.stringify(question, null, 2)}</pre>
    </div>
  )
}

export { Feed }