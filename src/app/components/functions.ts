"use server"
import { db } from "@/db"
import { start } from "repl";
import { requestInfo } from "rwsdk/worker";
import { Prisma } from "@prisma/client";

export const onAddIceBreaker = async (question: string) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

    await db.iceBreakers.create({
        data: {
            author: {
                connect: {
                    id: ctx.user.id,
                },
            },
            iceBreaker: question,
        }
    })

  return { success: true, error: null };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// interface for getQuestionsAndAnswers
export type iceBreakersInterface = Prisma.IceBreakersGetPayload<{
  include: {
    author: true
  }
}>

export const getIceBreakers = async () => {
    try {
  // currently gets last 5 days of questions and only current user's answers
  const questions = await db.iceBreakers.findMany({
    include: {
        author: true
    }
  });

  return { success: true, error: null, data: questions };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

// delete ice breaker
export const deleteIceBreaker = async (iceBreakerId: string) => {
    try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }

    await db.iceBreakers.delete({
        where: {
            id: iceBreakerId
        }
    })

  return { success: true, error: null };
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

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
                        followedBy: {
                            some: {
                                followingId: ctx.user.id
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

                //     {user: {
                //     following: {
                //         every: {
                //             followedById: ctx.user.id
                //         }
                //     }
                // }}


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



// interface for public questions for public feed
export type publicQuestionsInterface = Prisma.QuestionsGetPayload<{
  include: {
    answers: true
  }
}>

// get last x days of questions - no answers shown - for public feed
export const getPublicQuestions = async (todayMinusXDays: Date, startOfToday: Date) => {
    try {
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
        answers: true
    },
    orderBy: {
        dateKey: 'desc'
    }
  });

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


// interface for getQuestionsAndAnswers
export type outboundConnReqInterface = Prisma.pendingConnectionsGetPayload<{
  include: {
    requested: true
  }
}>

export const getOutboundConnReq = async () => {
        try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // get all inbound connection requests from ctx.user.id
        const outboundConns = await db.pendingConnections.findMany({
            where: {
                requesterId: ctx.user.id
            },
            include: {
                requested: true
            }
    })


    return { success: true, error: null, data: outboundConns};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

export const cancelOutboundConnReq = async (requestedId: string) => {
        try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // delete current user's pending connections to requestedId
    const cancelReq = await db.pendingConnections.deleteMany({
        where: {
            requesterId: ctx.user.id,
            requestedId: requestedId
        }
    })


    return { success: true, error: null};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}

export const cancelInboundConnReq = async (requesterId: string) => {
        try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // delete current user's pending connections from requesterId
    const cancelReq = await db.pendingConnections.deleteMany({
        where: {
            requesterId: requesterId,
            requestedId: ctx.user.id
        }
    })


    return { success: true, error: null};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}


// interface for getQuestionsAndAnswers
export type allConnInterface = Prisma.connectionsGetPayload<{
  select: {
    following: true
  }
}>

// get all current user's connections
export const getAllConn = async () => {
        try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // get all connections from ctx.user.id
        const conn = await db.connections.findMany({
            where: {
                followedById: ctx.user.id
            },
            select: {
                following: true
            }
    })


    return { success: true, error: null, data: conn};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}


// create connection
export const acceptConnReq = async (requesterId: string) => {
        try {
     const { ctx } = requestInfo;
     console.log(ctx.user)
    if (!ctx.user) {
      throw new Error("User not found");
    }
    // get all connections from ctx.user.id
        const conn = await db.connections.createMany({
        data: [
      {followingId: requesterId
        , followedById: ctx.user.id
      }
      , {followingId: ctx.user.id
        , followedById: requesterId
      }
    ]
    })

    // delete the pending request
    let pendingDeleteResult = await cancelInboundConnReq(requesterId);


    return { success: true, error: null, data: conn};
    }
   catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
}
