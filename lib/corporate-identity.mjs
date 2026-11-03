/** User-approved corporate identity. Domain and infrastructure identifiers are unchanged. */
export const corporateIdentity = Object.freeze({
  name: 'Centauri Renewable Corporation',
  acronym: 'CRC',
  siteUrl: 'https://www.ctriglobal.com',
  researchAuthority: 'Centauri Labs',
  manufacturer: 'Energy America',
  operationsManager: 'EA-VOLT',
  customerExperience: 'AD ASTRA',
  description: 'Centauri Renewable Corporation brings group governance, Centauri Labs research and development, Energy America manufacturing and EA-VOLT energy and infrastructure operations together.',
});

export const manufacturingLines = Object.freeze([
  Object.freeze({ title: 'Solar modules', description: 'Energy America manufactures solar modules within the group\'s product and quality-control framework.' }),
  Object.freeze({ title: 'Nickel-hydrogen BESS', description: 'Nickel-hydrogen battery energy storage systems are part of Energy America\'s manufacturing scope, supported by Centauri Labs research and technical validation.' }),
  Object.freeze({ title: 'Selenium solar cells and modules', description: 'The group\'s NASA-origin selenium-interlayer technology program connects Centauri Labs R&D with Energy America\'s cell and solar-module manufacturing scope.' }),
]);

export const productReleaseNotice = 'Product availability, production capacity, performance, certification and licensing scope remain subject to product-specific technical and contractual evidence. Technology origin does not imply NASA endorsement.';
export const seleniumTechnologyReference = 'https://technology.nasa.gov/patent/LEW-TOPS-50';
