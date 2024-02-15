import OpenAI from 'openai';

//Interface para "saber" o que esperar dela request
interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openAi: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openAi.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Hola, soy Luis Miguel y seré tu corrector ortográfico. ¿En qué puedo ayudarte hoy?',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],

    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0];
};
