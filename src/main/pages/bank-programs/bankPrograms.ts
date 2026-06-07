import { formatSize } from '../../data/fileSize';

type ProgramDoc = {
  title: string;
  file: string;
  size: string;
};

const program = (title: string, file: string): ProgramDoc => ({
  title,
  file,
  size: formatSize(file),
});

const BANK_PROGRAMS: ProgramDoc[] = [
  program('Программы АПК', '/assets/docs/bank-programs/programs-apk.pdf'),
  program('Программы ЭЭ', '/assets/docs/bank-programs/programs-ee.pdf'),
  program('Программы ТФ', '/assets/docs/bank-programs/programs-tf.pdf'),
  program(
    'Программы МСБ и&nbsp;МФ',
    '/assets/docs/bank-programs/programs-msb-mf.pdf',
  ),
];

export { BANK_PROGRAMS, type ProgramDoc };
