import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openAi.chat.completions.create({
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
    model: 'gpt-3.5-turbo',
  });

  //   const jsonRes = JSON.parse(completion.choices[0].message.content);
  return completion.choices[0].message;
};
