import OpenAI from 'openai';

interface Options {
  threadId: string;
  assitantId?: string;
}

export const createRunUseCase = async (opeAi: OpenAI, options: Options) => {
  const { threadId, assitantId = `${process.env.ASSITANT_ID}` } = options;

  const run = await opeAi.beta.threads.runs.create(threadId, {
    assistant_id: assitantId,
  });

  return run;
};
