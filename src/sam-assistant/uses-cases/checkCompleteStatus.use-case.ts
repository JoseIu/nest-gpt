import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkCompleteStatusUseCase = async (opeAi: OpenAI, options: Options) => {
  const { threadId, runId } = options;

  const runStatus = await opeAi.beta.threads.runs.retrieve(threadId, runId);

  console.log(runStatus.status);

  if (runStatus.status === 'completed') {
    return runStatus;
  }

  //esperamos 1seg
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(opeAi, options);
};
