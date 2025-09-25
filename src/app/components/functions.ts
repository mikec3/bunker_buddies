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


// create connection request
export const sendConnReq = async (username: string) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // first get userIdFromUsername
    const otherUsersId = await getUserIdFromUsername(username);
    console.log('other users Id : ' + otherUsersId.data.id)

    // now use the id to create connection request
        await db.pendingConnections.create({
        data: {
            requester: {
                connect: {
                    id: ctx.user.id,
                },
            },
            requested: {
                connect: {
                    id: otherUsersId.data.id,
                },
            }
        }
    })


    return { success: true, error: null};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// get userId From Username - used for sending outbound connection requests
const getUserIdFromUsername = async (username: string) => {
    try {
    //  get userIdFromUsername
    const otherUserId = await db.user.findUnique({
        where: {
            username: username
        }
    })

    return { success: true, error: null, data: otherUserId};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// interface for getQuestionsAndAnswers
export type inboundConnReqInterface = Prisma.pendingConnectionsGetPayload<{
  include: {
    requester: true
  }
}>

// get my inbound pending connection requests
export const getInboundConnReq = async () => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // get all inbound connection requests from ctx.user.id
        const inboundConns = await db.pendingConnections.findMany({
            where: {
                requestedId: ctx.user.id
            },
            include: {
                requester: true
            }
    })


    return { success: true, error: null, data: inboundConns};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}