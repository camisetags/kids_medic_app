import { Baby, Flower2, Footprints, Sun } from 'lucide-react';
export const phases = [
  { id: 'primeiros-meses', age: '0 a 6 meses', title: 'Os primeiros vínculos', description: 'Um começo cheio de novidades, para a criança e para a família.', icon: Baby, tone: 'sage', prompt: 'Dúvidas dos primeiros meses' },
  { id: 'descobertas', age: '6 a 12 meses', title: 'Um mundo para descobrir', description: 'Novos movimentos, novas experiências e muitas perguntas.', icon: Flower2, tone: 'clay', prompt: 'Perguntas sobre novas descobertas' },
  { id: 'primeiros-passos', age: '1 a 3 anos', title: 'Passos de autonomia', description: 'A infância ganha movimento, palavras e novos caminhos.', icon: Footprints, tone: 'moss', prompt: 'Perguntas sobre a rotina' },
  { id: 'novos-caminhos', age: '4 anos em diante', title: 'Cada vez mais mundo', description: 'Um olhar atento para cada nova etapa da infância.', icon: Sun, tone: 'sand', prompt: 'Assuntos para o próximo encontro' },
];
