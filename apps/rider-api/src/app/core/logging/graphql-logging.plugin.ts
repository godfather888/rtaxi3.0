import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common'; // Or your custom logger
import { UserContext } from '../../auth/authenticated-user';

@Plugin()
export class GraphqlLoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(GraphqlLoggingPlugin.name);

  async requestDidStart(
    requestContext: GraphQLRequestContext<UserContext>,
  ): Promise<GraphQLRequestListener<UserContext>> {
    // Avoid logging sensitive variables/query details here without sanitization
    this.logger.debug(
      `GraphQL Request Started: Op=${requestContext.request.operationName}`,
    );
    const requestStartTime = Date.now();

    return {
      async willSendResponse(context) {
        const elapsed = Date.now() - requestStartTime;
        Logger.log(
          `GraphQL Request Completed: Op=${context.request.operationName} - ${elapsed}ms`,
        );
        // Log context.errors if needed
      },
      async didEncounterErrors(context) {
        Logger.error(
          `GraphQL Errors: Op=${context.request.operationName}`,
          context.errors,
        );
      },
    };
  }
}
