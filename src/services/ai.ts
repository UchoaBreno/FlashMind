import { FlashcardStyle } from '@/types/flashcard';

interface GeneratedFlashcard {
  pergunta: string;
  resposta: string;
  tag: string;
}

const stylePrompts: Record<FlashcardStyle, string> = {
  definition: 'Use definições diretas e claras para cada conceito.',
  question: 'Formule perguntas objetivas com respostas concisas.',
  example: 'Inclua exemplos práticos e aplicações do mundo real.',
  analogy: 'Use analogias criativas para facilitar a memorização.',
};

// Mock data generator with realistic content based on topic
function generateMockFlashcards(topic: string, quantity: number, style: FlashcardStyle): GeneratedFlashcard[] {
  const topicLower = topic.toLowerCase();
  const tag = topic.toLowerCase().split(' ')[0];
  
  // Template-based content generation
  const templates: Record<string, GeneratedFlashcard[]> = {
    'revolução francesa': [
      { pergunta: 'Quando começou a Revolução Francesa?', resposta: 'A Revolução Francesa começou em 1789, com a Queda da Bastilha em 14 de julho.', tag },
      { pergunta: 'Quais eram os três estados na França pré-revolucionária?', resposta: 'Primeiro Estado (Clero), Segundo Estado (Nobreza) e Terceiro Estado (Povo comum, burguesia).', tag },
      { pergunta: 'O que foi a Queda da Bastilha?', resposta: 'Foi a tomada da prisão-fortaleza de Bastilha pelo povo de Paris em 14 de julho de 1789, símbolo do início da revolução.', tag },
      { pergunta: 'Qual era o lema da Revolução Francesa?', resposta: 'Liberdade, Igualdade, Fraternidade (Liberté, Égalité, Fraternité).', tag },
      { pergunta: 'Quem era o rei da França durante a Revolução?', resposta: 'Luís XVI, que foi executado na guilhotina em 1793.', tag },
      { pergunta: 'O que foi o Período do Terror?', resposta: 'Período de 1793-1794 liderado por Robespierre, marcado por execuções em massa de "inimigos da revolução".', tag },
      { pergunta: 'Quem foi Napoleão Bonaparte?', resposta: 'General que ascendeu ao poder após a revolução e tornou-se Imperador da França em 1804.', tag },
      { pergunta: 'O que foi a Declaração dos Direitos do Homem e do Cidadão?', resposta: 'Documento de 1789 que estabeleceu direitos fundamentais como liberdade, propriedade e igualdade perante a lei.', tag },
      { pergunta: 'Qual foi a causa econômica principal da revolução?', resposta: 'Crise financeira grave, com altos impostos para o Terceiro Estado e privilégios fiscais para clero e nobreza.', tag },
      { pergunta: 'O que foi a Assembleia Nacional Constituinte?', resposta: 'Assembleia formada em 1789 pelo Terceiro Estado para criar uma constituição e limitar o poder real.', tag },
    ],
    'python': [
      { pergunta: 'O que é Python?', resposta: 'Python é uma linguagem de programação de alto nível, interpretada, com sintaxe clara e foco em legibilidade.', tag },
      { pergunta: 'Como declarar uma variável em Python?', resposta: 'Basta atribuir um valor: nome = "João" ou numero = 42. Python tem tipagem dinâmica.', tag },
      { pergunta: 'O que é uma lista em Python?', resposta: 'Estrutura de dados ordenada e mutável. Ex: frutas = ["maçã", "banana", "laranja"]', tag },
      { pergunta: 'Qual a diferença entre lista e tupla?', resposta: 'Listas são mutáveis (podem ser alteradas), tuplas são imutáveis (não podem ser alteradas após criação).', tag },
      { pergunta: 'O que é um dicionário em Python?', resposta: 'Estrutura de dados com pares chave-valor. Ex: pessoa = {"nome": "Ana", "idade": 25}', tag },
      { pergunta: 'Como criar uma função em Python?', resposta: 'Usando def: def saudacao(nome): return f"Olá, {nome}!"', tag },
      { pergunta: 'O que faz o comando "for" em Python?', resposta: 'Itera sobre uma sequência. Ex: for item in lista: print(item)', tag },
      { pergunta: 'O que é indentação em Python?', resposta: 'Espaços no início das linhas que definem blocos de código. É obrigatória e substitui chaves {}.', tag },
      { pergunta: 'Como importar uma biblioteca em Python?', resposta: 'Usando import: import math ou from math import sqrt', tag },
      { pergunta: 'O que é uma list comprehension?', resposta: 'Forma concisa de criar listas: quadrados = [x**2 for x in range(10)]', tag },
    ],
  };

  // Check if we have specific content for this topic
  const matchedKey = Object.keys(templates).find(key => topicLower.includes(key));
  
  if (matchedKey && templates[matchedKey]) {
    const available = templates[matchedKey];
    return available.slice(0, Math.min(quantity, available.length));
  }

  // Generic content generation for unknown topics
  const genericQuestions = [
    { q: `Qual é a definição de ${topic}?`, a: `${topic} é um conceito fundamental que envolve aspectos teóricos e práticos importantes para o entendimento da área.` },
    { q: `Quais são as principais características de ${topic}?`, a: `As principais características incluem sua estrutura, funcionamento e aplicações práticas no contexto estudado.` },
    { q: `Qual a importância de ${topic}?`, a: `${topic} é importante porque permite compreender fenômenos relacionados e aplicar conhecimentos de forma prática.` },
    { q: `Como ${topic} se relaciona com outros conceitos?`, a: `${topic} está conectado a diversos outros conceitos da área, formando uma base de conhecimento integrada.` },
    { q: `Quais são os exemplos práticos de ${topic}?`, a: `Exemplos incluem aplicações cotidianas e casos de uso que demonstram a relevância do conceito.` },
    { q: `Qual é a origem histórica de ${topic}?`, a: `O conceito de ${topic} surgiu a partir de estudos e descobertas que moldaram o entendimento atual.` },
    { q: `Quais são os benefícios de estudar ${topic}?`, a: `Estudar ${topic} desenvolve habilidades analíticas e proporciona conhecimento aplicável.` },
    { q: `Como aplicar ${topic} na prática?`, a: `A aplicação prática envolve identificar situações relevantes e usar os princípios de ${topic} para resolver problemas.` },
  ];

  return genericQuestions.slice(0, Math.min(quantity, genericQuestions.length)).map(item => ({
    pergunta: item.q,
    resposta: item.a,
    tag,
  }));
}

export async function generateFlashcards(
  topic: string,
  quantity: number,
  style: FlashcardStyle
): Promise<GeneratedFlashcard[]> {
  const systemPrompt = `Você é um especialista em criar flashcards educacionais otimizados para memorização.
Crie flashcards claros, objetivos e fáceis de memorizar.
${stylePrompts[style]}
Responda APENAS com um array JSON válido, sem texto adicional.`;

  const userPrompt = `Crie ${quantity} flashcards sobre o tema: "${topic}".
  
Formato EXATO esperado (array JSON):
[
  {
    "pergunta": "pergunta ou conceito aqui",
    "resposta": "resposta ou definição aqui",
    "tag": "${topic.toLowerCase().split(' ')[0]}"
  }
]

Responda APENAS com o array JSON, sem markdown, sem explicações.`;

  // For now, return mock data since we don't have backend yet
  // This will be replaced with actual AI call when Lovable Cloud is enabled
  const mockCards = generateMockFlashcards(topic, quantity, style);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return mockCards;
}

// This function will be used when Lovable Cloud is enabled
export async function generateFlashcardsWithAI(
  topic: string,
  quantity: number,
  style: FlashcardStyle,
  apiEndpoint: string
): Promise<GeneratedFlashcard[]> {
  const styleInstruction = stylePrompts[style];
  
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      quantity,
      styleInstruction,
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar flashcards');
  }

  const data = await response.json();
  return data.flashcards;
}
