import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamUseCase = async (opeAi: OpenAI, options: Options) => {
  const { prompt } = options;

  return await opeAi.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',

    messages: [
      {
        role: 'system',
        content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    top_p: 1,
    max_tokens: 500,
  });
};
