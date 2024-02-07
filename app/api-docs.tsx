import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';
import 'swagger-ui-react/swagger-ui.css';

/*const SwaggerUI: ComponentType<{
  spec: any;
}> = dynamic(import('swagger-ui-react').then(mod => mod.default) as DynamicOptions, { ssr: false }) as ComponentType<{
  spec: any;
}> ;*/
interface SwaggerUIProps {
  spec: object;
}

// Dynamically import SwaggerUI with a more generic approach to circumvent the type issue
const SwaggerUIWrapper: React.FC<SwaggerUIProps> = (props) => {
  // Use a type assertion to 'any' to bypass detailed type checking
  const SwaggerUI: any = dynamic(() => import('swagger-ui-react').then(mod => mod.default as any), {
    ssr: false,
  });

  // Since SwaggerUI is typed as 'any', it bypasses TypeScript's strict type checks
  return <SwaggerUI {...props} />;
};



function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUIWrapper spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'io.vefkoli.is API Docs',
        version: '1.0',
        schemaFolders: ['models'],
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
