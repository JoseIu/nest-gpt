import OpenAI from 'openai';

export const translateUseCase = async (opeAi: OpenAI, { prompt, lang }) => {
  const completion = await opeAi.chat.completions.create({
    model: 'gpt-3.5-turbo',

    messages: [
      {
        role: 'system',
        content: `Se te dará un texto o documento y tu tarea es traducirlo al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
  });

  //Return only the content
  return { message: completion.choices[0].message.content };
};
