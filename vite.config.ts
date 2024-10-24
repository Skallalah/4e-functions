import * as fsPromises from "fs/promises";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import { defineConfig, Plugin } from "vite";
import path from 'path';
import glob from 'glob';

const moduleVersion = process.env.MODULE_VERSION;
const githubProject = process.env.GH_PROJECT;
const githubTag = process.env.GH_TAG;

console.log(process.env.VSCODE_INJECTION);

export default defineConfig({
  /*build: {
    sourcemap: true,
    rollupOptions: {
      input: "src/ts/apps",
      output: {
        dir: './dist/scripts',
        format: "es",
      },
    },
  },*/
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['yeoman-generator'],
      input: glob.sync(path.resolve(__dirname, 'src/**/*.ts')),
      output: {
        preserveModules: false,
        entryFileNames: (entry) => {
          const { name, facadeModuleId } = entry;
          const fileName = `${name}.js`;
          if (!facadeModuleId) {
            return fileName;
          }
          const relativeDir = path.relative(
            path.resolve(__dirname, 'src'),
            path.dirname(facadeModuleId),
          );
          return path.join(relativeDir, fileName);
        },
      },
    },
  },
  plugins: [
    updateModuleManifestPlugin(),
    scss({
      output: "dist/style.css",
      sourceMap: true,
      watch: ["src/styles/*.scss"],
    }),
    copy({
      targets: [
        { src: "src/languages", dest: "dist" },
        { src: "src/templates", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
  ],
});

function updateModuleManifestPlugin(): Plugin {
  return {
    name: "update-module-manifest",
    async writeBundle(): Promise<void> {
      const packageContents = JSON.parse(
        await fsPromises.readFile("./package.json", "utf-8")
      ) as Record<string, unknown>;
      const version = moduleVersion || (packageContents.version as string);
      const manifestContents: string = await fsPromises.readFile(
        "src/module.json",
        "utf-8"
      );
      const manifestJson = JSON.parse(manifestContents) as Record<
        string,
        unknown
      >;
      manifestJson["version"] = version;
      if (githubProject) {
        const baseUrl = `https://github.com/${githubProject}/releases`;
        manifestJson["manifest"] = `${baseUrl}/latest/download/module.json`;
        if (githubTag) {
          manifestJson[
            "download"
          ] = `${baseUrl}/download/${githubTag}/module.zip`;
        }
      }
      await fsPromises.writeFile(
        "dist/module.json",
        JSON.stringify(manifestJson, null, 4)
      );
    },
  };
}
