import { Project } from 'ts-morph';
import { sync } from 'fast-glob';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

async function addDecoratorsToDTOs() {
  const files = sync(['**/*.dto.ts', '**/*.input.ts'], { absolute: true });

  for (const filePath of files) {
    const sourceFile =
      project.getSourceFile(filePath) || project.addSourceFileAtPath(filePath);

    let fileHasId = false;
    let fileHasFloat = false;
    let fileHasGraphQLISODateTime = false;
    let fileHasInt = false;

    const classes = sourceFile
      .getClasses()
      .filter((cls) =>
        cls
          .getDecorators()
          .some(
            (d) => d.getName() === 'ObjectType' || d.getName() === 'InputType',
          ),
      );

    for (const cls of classes) {
      const fields = cls.getProperties();
      for (const prop of fields) {
        if (prop.getName() === 'id') {
          fileHasId = true;
          const hasIdFieldDecorator = prop
            .getDecorators()
            .some((d) => d.getName() === 'IDField');
          if (!hasIdFieldDecorator) {
            prop.addDecorator({
              name: 'IDField',
              arguments: [`() => ID`],
            });
          }
          const importDecl = sourceFile.getImportDeclaration(
            (d) =>
              d.getModuleSpecifierValue() === '@ptc-org/nestjs-query-graphql',
          );
          if (importDecl) {
            const namedImports = importDecl
              .getNamedImports()
              .map((i) => i.getName());
            if (!namedImports.includes('IDField')) {
              importDecl.addNamedImport('IDField');
            }
          } else {
            sourceFile.addImportDeclaration({
              moduleSpecifier: '@ptc-org/nestjs-query-graphql',
              namedImports: ['IDField'],
            });
          }
          continue;
        }
        const hasFieldDecorator = prop
          .getDecorators()
          .some(
            (d) =>
              d.getName() === 'Field' ||
              d.getName() === 'IDField' ||
              d.getName() === 'FilterableField',
          );
        if (!hasFieldDecorator) {
          const type = prop.getType().getText();
          const isArray = prop.getType().isArray();
          const isDoubleArray =
            prop.getType().isArray() &&
            prop.getType().getArrayElementType()?.isArray() === true;
          const isNullable = prop.getQuestionTokenNode() !== undefined;
          let typeName = type;
          if (prop.getName().endsWith('Id')) {
            typeName = 'ID';
            fileHasId = true;
            prop.addDecorator({
              name: 'Field',
              arguments: [`() => ID`, `{ nullable: ${isNullable} }`],
            });
            continue;
          }
          switch (type) {
            case 'number':
              fileHasFloat = true;
              typeName = 'Float';
              break;
            case 'Date':
              fileHasGraphQLISODateTime = true;
              typeName = 'GraphQLISODateTime';
              break;
            case 'string':
              typeName = 'String';
              break;
            case 'boolean':
              typeName = 'Boolean';
              break;
            case 'Point':
              typeName = 'Point';
              break;
            default:
              if (type.startsWith('import(')) {
                // remove import() syntax
                typeName = type.replace(/import\(".*?"\)\.(.*)/, '$1').trim();
              }
          }
          prop.addDecorator({
            name: 'Field',
            arguments: [
              `() => ${
                isDoubleArray
                  ? `[[${typeName.replace('[]', '')}]]`
                  : isArray
                    ? `[${typeName.replace('[]', '')}]`
                    : typeName
              }`,
              `{ nullable: ${isNullable} }`,
            ],
          });
        }
      }
    }

    // Ensure `Field` and `ObjectType` are imported from `@nestjs/graphql`
    const importDecl = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === '@nestjs/graphql',
    );

    if (importDecl) {
      const namedImports = importDecl.getNamedImports().map((i) => i.getName());
      if (!namedImports.includes('Field')) {
        importDecl.addNamedImport('Field');
      }
      if (!namedImports.includes('ID') && fileHasId) {
        importDecl.addNamedImport('ID');
      }
      if (!namedImports.includes('Float') && fileHasFloat) {
        importDecl.addNamedImport('Float');
      }
      if (
        !namedImports.includes('GraphQLISODateTime') &&
        fileHasGraphQLISODateTime
      ) {
        importDecl.addNamedImport('GraphQLISODateTime');
      }
      if (!namedImports.includes('Int') && fileHasInt) {
        importDecl.addNamedImport('Int');
      }
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: '@nestjs/graphql',
        namedImports: [
          fileHasId ? 'ID' : null,
          fileHasFloat ? 'Float' : null,
          fileHasGraphQLISODateTime ? 'GraphQLISODateTime' : null,
          fileHasInt ? 'Int' : null,
          'Field',
        ].filter(Boolean) as string[],
      });
    }

    await sourceFile.save();
  }
}

addDecoratorsToDTOs().catch(console.error);
