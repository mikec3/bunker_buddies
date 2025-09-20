"use server"
import { db } from "@/db"
import { start } from "repl";
import { requestInfo } from "rwsdk/worker";
import { Prisma } from "@prisma/client";

export const submitAnswer = async (answer: string, questionId: string) => {
try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

        console.log(answer);
        console.log(questionId);

    await db.answer.create({
        data: {
            user: {
                connect: {
                    id: ctx.user.id,
                },
            },
            question: {
                connect: {
                    id: questionId,
                },
            },
            answerText: answer,
        }
    })

  return { success: true, error: null };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

export const getQuestions = async (todayMinusXDays: Date, startOfToday: Date) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

  // currently gets last 5 days of questions and only current user's answers
  const questions = await db.question.findMany({
    where: {
        dateKey: {
            gte: todayMinusXDays,
            lte: startOfToday
        }
    }
  });

  return { success: true, error: null, data: questions };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// interface for getQuestionsAndAnswers
export type questionsAndAnswersInterface = Prisma.UserGetPayload<{
  include: {
    answers: {
        include: {
            user: true
        }
    }
  }
}>

export const getQuestionsAndAnswers = async (todayMinusXDays: Date, startOfToday: Date) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

        console.log(todayMinusXDays);
        console.log(startOfToday);

  const questions = await db.question.findMany({
    where: {
        dateKey: {
            gte: todayMinusXDays,
            lte: startOfToday
        }
    },
    include: {
        answers: {
            where: {
                OR: [
                    {user: {
                        id: ctx.user.id
                    }},
                    {user: {
                    following: {
                        every: {
                            followedById: ctx.user.id
                        }
                    }
                }}
            ]
            },
            include: {
                user: true
            }
        }
    },
    orderBy: {
        dateKey: 'desc'
    }
  });

//   const questions = await db.question.findMany({
//     where: {
//         dateKey: {
//             gte: todayMinusXDays,
//             lte: startOfToday
//         }
//     },
//     include: {
//         answers: {
//             where: {
//                 OR: [
//                     {user: {
//                         id: ctx.user.id
//                     }},
//                     {user: {
//                         id: {
//                             not: ctx.user.id
//                         }
//                     }
//                     }
//                 ]
//             }
//         }
//     }
//   });

  return { success: true, error: null, data: questions };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// get mine and connections and their responses.
export const getConnectionsAndAnswers = async (todayMinusXDays: Date, startOfToday: Date) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

        console.log(todayMinusXDays);
        console.log(startOfToday);

  const questions = await db.user.findUnique({
    where: {
        id: ctx.user.id
    },
    include: {
        answers: {
            where: {
                question: {
                    dateKey: {
                        gte: todayMinusXDays,
                        lte: startOfToday,
                    }
                }
            }
        },
        following: {
            include: {
                followedBy: {
                    include: {
                        answers: {
                            where: {
                                question: {
                                    dateKey: {
                                        gte: todayMinusXDays,
                                        lte: startOfToday,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  });

  return { success: true, error: null, data: questions };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}