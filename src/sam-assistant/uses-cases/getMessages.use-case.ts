import OpenAI from 'openai';

interface Options {
  threadId: string;
}

export const getMessagesUseCase = async (opeAi: OpenAI, options: Options) => {
  const { threadId } = options;
  const messagesList = await opeAi.beta.threads.messages.list(threadId);

  const messages = messagesList.data.map((eachMessage) => {
    return {
      role: eachMessage.role,
      content: eachMessage.content.map((eachContent) => (eachContent as any).text.value),
    };
  });

  return messages.reverse();
};
