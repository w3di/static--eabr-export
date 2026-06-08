import { formatSize } from '../../../data/fileSize';

type ComplianceDoc = {
  title: string;
  file: string;
  size: string;
};

const doc = (title: string, file: string): ComplianceDoc => ({
  title,
  file,
  size: formatSize(file),
});

const COMPLIANCE_DOCS: { left: ComplianceDoc[]; right: ComplianceDoc[] } = {
  left: [
    doc(
      'Кодекс деловой этики и&nbsp;поведения Евразийского банка развития',
      '/assets/docs/compliance/code-of-ethics.pdf',
    ),
    doc(
      'Система контроля соответствия',
      '/assets/docs/compliance/compliance-control-system.pdf',
    ),
    doc(
      'Положение Комитета по&nbsp;этике Евразийского банка развития',
      '/assets/docs/compliance/ethics-committee-regulation.pdf',
    ),
  ],
  right: [
    doc(
      'Положения о&nbsp;приеме новых членов в&nbsp;Евразийский банк развития',
      '/assets/docs/compliance/new-members-admission.pdf',
    ),
    doc(
      'Уведомление о&nbsp;конфиденциальности в&nbsp;отношении обработки персональных данных третьих лиц',
      '/assets/docs/compliance/privacy-notice-third-parties.pdf',
    ),
    doc(
      'Уведомление о&nbsp;конфиденциальности в&nbsp;отношении обработки персональных данных сотрудников и&nbsp;соискателей',
      '/assets/docs/compliance/privacy-notice-employees.pdf',
    ),
  ],
};

export { COMPLIANCE_DOCS, type ComplianceDoc };
