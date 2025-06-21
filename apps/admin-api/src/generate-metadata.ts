import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/graphql/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      pathToSource: __dirname,
      typeFileNameSuffix: ['.input.ts', '.dto.ts'],
    }),
  ],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: 'tsconfig.app.json',
});
