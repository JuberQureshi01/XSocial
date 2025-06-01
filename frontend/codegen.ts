
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://web-exr8.onrender.com/graphql", //get the schema from here
  documents: "**/*.{tsx,ts}", //means check all the tsx and ts file in folder
  generates: {
    "gql/": {  //generate output here 
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
