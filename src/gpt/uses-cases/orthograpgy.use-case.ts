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
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
        Las palabras usadas deben existir en el diccionario de la Real Academia Española y asociacion de academias de la lengua española.
        Debes responder en formato JSON.
      
        Tu tarea es corregir los errores ortográficos y gramaticales. Sin embargo, no corrijas palabras que ya estén escritas correctamente.
        Además, se permiten americanismos y palabras regionales que pueden no estar en el diccionario de la RAE.
      
        Debes calcular un porcentaje de acierto para el usuario.
      
        Si no hay errores, debes retornar un mensaje de felicitaciones.

        Ejemplo de entrada: 'Los hestudios de este autor sobre los prozesos microsociales de la interacción configuran una teoria psicosociologica sobre los conportamientos umanos que permite esplicar situaciones lingüisticas muy diferentes como justificaciones, escusas, actos indirectos, sobreentendidos, etc'.
        Corrección: 'Los estudios de este autor sobre los procesos microsociales de la interacción configuran una teoría psicosociológica sobre los comportamientos humanos que permite explicar situaciones lingüísticas muy diferentes como justificaciones, excusas, actos indirectos, sobreentendidos, etc.'
        Errores: ['hestudios -> estudios', 'prozesos -> procesos', 'teoria -> teoría', 'psicosociologica -> psicosociológica', 'conportamientos -> comportamientos', 'umanos -> humanos', 'esplicar -> explicar', 'lingüisticas -> lingüísticas', 'escusas -> excusas']

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: string, //  Retorna la frase corregida, si no hay errores, retorna un mensaje de felicitaciones.
        }
        
        
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],

    model: 'gpt-3.5-turbo',
  });

  const jsonRes = JSON.parse(completion.choices[0].message.content);
  return jsonRes;
};
